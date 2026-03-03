Step 1: Store it as one state
const [identifier, setIdentifier] = useState("");

Use it in your input:

<FormInput
  type="text"
  placeholder="Username or Email"
  logo="account_circle"
  name="identifier"
  value={identifier}
  onChange={(e) => setIdentifier(e.target.value)}
/>
✅ Step 2: Detect if it’s email or username

The simplest way:

const isEmail = identifier.includes("@");

Better (recommended) — use regex:

const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
✅ Step 3: Build the object dynamically
const handleSubmit = () => {
  let payload;

  if (isEmail) {
    payload = {
      email: identifier,
      username: ""
    };
  } else {
    payload = {
      username: identifier,
      email: ""
    };
  }

  console.log(payload);
};
🔥 Cleaner & More Professional Way

Instead of sending both fields, send only one:

const payload = isEmail
  ? { email: identifier }
  : { username: identifier };

Even better (what most apps do):

const payload = { identifier };

And let the backend decide whether it's email or username.

👉 This is the recommended real-world approach.

💡 Best Practice (Important)

In real applications:

✔ Frontend just sends:

{ identifier: "test@test.com", password: "123456" }

✔ Backend checks:

If contains @ → treat as email

Else → treat as username

This keeps frontend simple and secure.

🚀 Final Recommendation

Use:

const [formData, setFormData] = useState({
  identifier: "",
  password: ""
});

And let backend handle the logic.