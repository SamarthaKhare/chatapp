const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;  // ✅ Load from `.env`

export async function sendMessage(query) {
  try {
    const response = await fetch(`${BACKEND_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from server");
    }

    const data = await response.json();
    return data;  // ✅ Returns { answer: "..." }
  } catch (error) {
    console.error("Error:", error.message);
    return { answer: "Error: Unable to fetch response." };  // ✅ Avoids undefined errors
  }
}
