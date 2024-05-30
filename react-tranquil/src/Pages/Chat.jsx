import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../data/userService";
import { useDebounce } from "use-debounce";
import {
    addDoc,
    collection,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { firestore } from "../data/init";

function Chat() {
    const [searchQuery, setSearchQuery] = useState("");
    const [contactsHTML, setContactsHTML] = useState([]);
    const [contacts, setContacts] = useState([]);
    const input = useRef(null);
    const [anotherUser, setAnotherUser] = useState({ uid: "" });
    const [messages, setMessages] = useState([]);
    const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

    const user = useUser();

    const handleContactChange = (contact) => {
        setAnotherUser(contact);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = collection(firestore, "users");
            const q = query(usersRef);
            const results = await getDocs(q);
            const fetchedUsers = [];
            results.forEach((doc) => {
                fetchedUsers.push(doc.data());
            });
            setContacts(fetchedUsers);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const HTML = contacts
            .filter(
                (contact) =>
                    contact.displayName
                        .toLowerCase()
                        .startsWith(debouncedSearchQuery) ||
                    contact.email.toLowerCase().startsWith(debouncedSearchQuery)
            )
            .map((contact) => (
                <span
                    className="contact"
                    onClick={() => handleContactChange(contact)}
                    key={contact.uid}
                >
                    {contact.displayName}
                    <br />{" "}
                    <i style={{ color: "gray", fontSize: "12px" }}>
                        {contact.email}
                    </i>
                </span>
            ));
        setContactsHTML(HTML);
    }, [debouncedSearchQuery, contacts]);

    useEffect(() => {
        if (user == null) {
            return;
        }

        const q = query(
            collection(firestore, "messages"),
            where("from", "in", [user?.uid, anotherUser.uid]),
            where("to", "in", [user?.uid, anotherUser.uid]),
            orderBy("date", "desc"),
            limit(20)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                fetchedMessages.push({ ...data, id: doc.id });
            });
            const messages = fetchedMessages.sort((a, b) => a.date - b.date);
            setMessages(messages);
        });
        return () => unsubscribe;
    }, [anotherUser, user]);

    const handleSendMessage = async () => {
        const message = input.current?.value;

        // prevent sending empty message or message to non existing user
        if (
            user?.uid === null ||
            message.trim() === "" ||
            anotherUser.uid === ""
        ) {
            return;
        }

        await addDoc(collection(firestore, "messages"), {
            user: user.displayName,
            from: user?.uid,
            to: anotherUser.uid,
            text: message,
            date: serverTimestamp(),
        });

        input.current.value = "";
    };

    if (user === null) {
        return (
            <section className="page-title">
                <article>
                    <h1 className="title-large">
                        <b>Please log in to chat with other users.</b>
                    </h1>
                </article>
            </section>
        );
    }

    return (
        <div className="grid chat-grid">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Contacts</h2>
                </div>
                <input
                    id="user-search"
                    className="searchbar"
                    placeholder="Search user"
                    value={searchQuery}
                    onChange={handleSearch}
                    style={{
                        width: "90%",
                        borderRadius: "var(--radius-small)",
                    }}
                />
                <div className="contact-list">{contactsHTML}</div>
            </div>
            <div className="chat">
                <div className="chat-header">
                    <h2>{anotherUser.displayName}</h2>
                </div>
                <div className="chat-body">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                message.from === user.uid
                                    ? "chat-message-self"
                                    : "chat-message-other"
                            }`}
                        >
                            {message.from === user.uid || (
                                <span className="chat-user">
                                    {message.user}
                                </span>
                            )}
                            <br />
                            <span
                                className={`chat-text ${
                                    message.from === user.uid
                                        ? "chat-text-self"
                                        : "chat-text-other"
                                }`}
                            >
                                {message.text}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="chat-footer">
                    <input
                        className="chat-input"
                        type="text"
                        placeholder="Type your message"
                        ref={input}
                    />
                    <button
                        className="button secondary"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
