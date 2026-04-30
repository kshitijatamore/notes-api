import { useState } from "react";
import axios from "axios";


function App() {

  const API = "https://notes-api-3wr3.onrender.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);

 const register = async () => {
  try {
    const res = await axios.post(`${API}/register`, {
      email,
      password,
      name: "test",
      age: 20
    });

    console.log("SUCCESS RESPONSE:", res.data); // 👈 see backend response
    alert(res.data.message || "Registered Successfully"); // ✅ FIX

  } catch (err) {
    console.log("ERROR:", err.response?.data);

    alert(
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      JSON.stringify(err?.response?.data) ||
      "Something went wrong"
    );
  }
};

const login = async () => {
  try {
    const res = await axios.post(`${API}/login`, {
      email,
      password
    });

    alert("Login Success");
    console.log(res.data);

    setToken(res.data.token); // 👈 store token

  } catch (err) {
    alert(err?.response?.data?.error || "Login failed");
  }
};

const createNote = async () => {
  try {
    const res = await axios.post(
      `${API}/notes`,
      {
        title: "My First Note",
        content: "Hello Kshitija this side, this is my first note content"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Note created");
    getNotes();

  } catch (err) {
    alert("Error creating note");
    console.log(err.response?.data);
  }
};

const getNotes = async () => {
  try {
    const res = await axios.get(
      `${API}/notes`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(res.data);
    setNotes(res.data); // 👈 store notes

  } catch (err) {
    console.log(err.response?.data);
    alert("Error fetching notes");
  }
};

const deleteNote = async (id) => {
  try {
    await axios.delete(
      `${API}/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Note deleted");
    getNotes(); // refresh

  } catch (err) {
    console.log(err.response?.data);
    alert("Error deleting note");
  }
};

  return (   // ✅ INSIDE function
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={register}>Register</button>

          <button onClick={login}>Login</button>

            <br /><br />

             <p>Token: { token }</p>
               <br />

                <button onClick={createNote}>Create Note</button>
                <button onClick={getNotes}>Get Notes</button>
                
                <h2>Your Notes:</h2>
                {notes.map(note => (
                  <div key={note._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <button onClick={() => deleteNote(note._id)}>
                      Delete
                      </button>
                  </div>
                ))}

    </div>
  );
}

export default App;