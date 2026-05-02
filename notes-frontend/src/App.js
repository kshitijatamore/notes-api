import { useState,  useEffect } from "react";
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


useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }
}, []);

 const register = async () => {
  try {
    const res = await axios.post(`${API}/register`, {
      email,
      password,
      name: "test",
      age: 20
    });

    console.log("SUCCESS RESPONSE:", res.data); 
    alert(res.data.message || "Registered Successfully"); 

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

    setToken(res.data.token); //  store token
     localStorage.setItem("token", res.data.token);

  } catch (err) {
    alert(err?.response?.data?.error || "Login failed");
  }
};

const createNote = async () => {
  try {
    await axios.post(
      `${API}/notes`,
      {
        title ,
        content
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
  <div style={{   maxWidth: "400px",
    margin: "0 auto" }}>
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
      <button onClick={register}
       style={{
    padding: "8px 12px",
    borderRadius: "6px",
    marginRight: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none"
  }}
      >Register</button>
        &nbsp;&nbsp;
          <button onClick={login}
            style={{
    padding: "8px 12px",
    borderRadius: "6px",
    background: "#007bff",
    color: "#fff",
    border: "none"
  }}

          
          >Login</button>

            <br /><br />

{token ? <p>Logged in ✅</p> : <p>Please login to access your notes 🔐</p>}
<br />
            {token &&(
  <div>
    <button onClick={() => {
      setToken("");
      localStorage.removeItem("token");
    }}>
      Logout
    </button>
  </div>
)}
     <br />
     
{token && (
  <>

                <button onClick={editId ? updateNote : createNote}
                 style={{
    padding: "8px 12px",
    borderRadius: "6px",
    marginRight: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none"
  }}>
      {editId ? "Update Note" : "Create Note"}
   </button>
          &nbsp;&nbsp;
                <button onClick={getNotes}
                 style={{
    padding: "8px 12px",
    borderRadius: "6px",
    background: "#17a2b8",
    color: "#fff",
    border: "none"
  }}
                >Get Notes</button>
                {loading && <p>Loading...</p>}
{error && <p style={{ color: "red" }}>{error}</p>}
                <br /><br />
                <h2>Your Notes:</h2>
                {notes.length === 0 && <p>No notes yet. Create one!</p>}
                {notes
  .filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  )
  .map(note => (
                  <div
  key={note._id}
  style={{
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  }}
>
                    <h3>{note.title}</h3>
                    <p style={{ lineHeight: "1.5" }}>{note.content}</p>
                    <p style={{ fontSize: "12px", color: "gray" }}>
  {note.updatedAt
    ? new Date(note.updatedAt).toLocaleString()
    : ""}
</p>
                    <button onClick={() => deleteNote(note._id)}
                        style={{
    padding: "8px 12px",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
    background: "red",
    color: "#fff",
    border: "none"
  }}>
                      Delete
                      </button>

                    <button onClick={() => {
                      setEditId(note._id);
                      setTitle(note.title);
                      setContent(note.content);
                    }}  style={{
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#007bff",
    color: "#fff",
    border: "none"
  }}>
                      Edit
                    </button>
                  </div>
                ))}
              </>
)}


    </div>
    </div>
  );
}


export default App;