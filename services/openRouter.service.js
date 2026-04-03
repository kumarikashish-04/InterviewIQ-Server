const axios = require("axios");

const askAi = async (messages) => {
  try {
    // ✅ correct validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty.");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions", // ✅ FIXED URL
      {
        model: "openai/gpt-4o-mini",
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ correct extraction
    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content || !content.trim()) {
      console.log("FULL RESPONSE:", response.data); // 🔥 debug
      throw new Error("AI returned empty response.");
    }

    return content;

  } catch (error) {
    // ✅ better error logging
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );

    throw new Error("AI request failed");
  }
};

module.exports = askAi;