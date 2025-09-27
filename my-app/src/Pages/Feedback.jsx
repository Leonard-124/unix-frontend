


import React, { useState } from "react";

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("https://unix.up.railway.app/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, email }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("✅ Feedback sent successfully!");
      setMessage("");
      setEmail("");
      setTimeout(() => {
        setOpen(false);
        setStatus("");
      }, 2000);
    } catch (err) {
      setStatus("❌ Failed to send feedback");
    }
  };

  return (
    <div className="fixed bottom-28 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-red-600 text-white px-5 py-2 rounded-full shadow-lg animate-bounce hover:bg-red-700 transition"
        >
          Feedback
        </button>
      )}

      {/* Popup Form */}
      {open && (
        <div className="bg-white shadow-xl rounded-lg p-5 w-80 animate-fadeIn">
          <h2 className="text-lg font-bold mb-3">Send Us Your Feedback to improve Unix</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="Your email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your feedback..."
              className="w-full border rounded px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <div className="flex justify-between gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 border rounded py-2 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
              >
                Send
              </button>
            </div>
          </form>

          {status && (
            <p className="mt-2 text-sm text-gray-600 text-center">{status}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Feedback;