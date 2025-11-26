import React, { useState, useRef } from "react";
import "./SubmitReceipt.css";
import { createReceipt } from "./model/receipt";
import { useAuth, useUserOnlyPage } from "./Authentication/AuthContext";
import { useNavigate } from "react-router";

export default function SubmitReceipt() {
    useUserOnlyPage();

    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [date, setDate] = useState<Date | null>();
    const [amount, setAmount] = useState<number>(0);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImage(reader.result as string);
        });
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ image, title, subject, date, amount });

        if (date == null || image == null)
            return alert("Date or image is missing.");

        createReceipt({
            title,
            subject,
            date,
            amount,
            image,
            email: user!.email,
        });
        alert("Receipt submitted! Check console for details.");
        navigate("/dashboard");
    };

    return (
        <div className="background">
            <div className="submit-receipt-card">
                <form className="form" onSubmit={handleSubmit}>
                    <div
                        className="image-box"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {image ? (
                            <img
                                src={image}
                                alt="preview"
                                className="preview-image-box"
                            />
                        ) : (
                            <span className="placeholder">
                                Tap to upload image
                            </span>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input"
                    />

                    <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="input"
                    >
                        <option value="">Subject</option>
                        <option value="food">Food</option>
                        <option value="gas">Gas</option>
                        <option value="weekly-meeting">Weekly Meeting</option>
                    </select>

                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.valueAsDate)}
                        className="input"
                    />

                    <div className="amount-row">
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(parseFloat(e.target.value))
                            }
                            className="input"
                        />
                        <span className="currency">€</span>
                    </div>

                    <button type="submit" className="submit">
                        {" "}
                        Submit{" "}
                    </button>
                </form>
            </div>
        </div>
    );
}
