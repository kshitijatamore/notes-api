import { useState } from "react";
import axios from "axios";


function App() {

  const API = "https://notes-api-3wr3.onrender.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [dark, setDark] = useState(false);

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
    await axios.post(
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
  setLoading(true);
  setError("");

  try {
    const res = await axios.get(`${API}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setNotes(res.data);

  } catch (err) {
    setError("Failed to fetch notes");

  } finally {
    setLoading(false);
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

const updateNote = async () => {
  try {
    await axios.put(
      `${API}/notes/${editId}`,
      { title, content },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Note updated");
    setEditId(null);
    getNotes();

  } catch {
    alert("Update failed");
  }
};

  return (   // ✅ INSIDE function
    <div style={{
  background: dark ? "#121212" : "#fff",
  color: dark ? "#fff" : "#000",
  minHeight: "100vh",
  padding: "20px"
}}>
      <h1>Notes App</h1>

      <input
  placeholder="Search..."
  onChange={(e) => setSearch(e.target.value)}
/>
<br /><br />
<div style={{ marginBottom: "20px" }}></div>
      <input
        placeholder="Email"
        value={email}
  autoComplete="new-email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
  autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <input
  placeholder="Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    marginBottom: "10px"
  }}
/>

<br /><br />

<textarea
  placeholder="Content"
  value={content}
  onChange={(e) => setContent(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    borderRadius: "8px",
    marginBottom: "10px"
  }}
/>
<br /><br />

<button onClick={() => setDark(!dark)}>
  Toggle Dark Mode
</button>
<br /><br />
      <button onClick={register}>Register</button>
        &nbsp;&nbsp;
          <button onClick={login}>Login</button>

            <br /><br />

             <p>Token: { token }</p>
               <br />

                <button onClick={editId ? updateNote : createNote}>
    {editId ? "Update Note" : "Create Note"}
   </button>

                <button onClick={getNotes}>Get Notes</button>
                {loading && <p>Loading...</p>}
{error && <p style={{ color: "red" }}>{error}</p>}
                <br /><br />
                <h2>Your Notes:</h2>
                {notes
  .filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  )
  .map(note => (
                  <div key={note._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <p style={{ fontSize: "12px", color: "gray" }}>
  {note.updatedAt
    ? new Date(note.updatedAt).toLocaleString()
    : ""}
</p>
                    <button onClick={() => deleteNote(note._id)}>
                      Delete
                      </button>
                    <button onClick={() => {
                      setEditId(note._id);
                      setTitle(note.title);
                      setContent(note.content);
                    }}>
                      Edit
                    </button>
                  </div>
                ))}

    </div>
  );
}


export default App;