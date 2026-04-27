import { useState } from "react";
import axios from "axios";


function App() {
  const [email, setEmail] = useState("");
  const [fail, setFail] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/send-email", {
        email,
        fail,
      });

      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error occurred");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🚀 TaskStream</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          checked={fail}
          onChange={() => setFail(!fail)}
        />
        Force Failure
      </label>

      <br /><br />

      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Send Job
      </button>

      <br /><br />

      <p>{message}</p>
    </div>
  );
}

export default App;