import { useState } from 'react';
import { myAi } from './lib/External.ts';

export default function ViewXChangeApp() {
  const [formData, setFormData] = useState<{ text: string }>({ text: "" });
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");
    console.log("User input:", formData);

    try {
      const aiResponse = await myAi(formData.text);
      setResponse(aiResponse || "No response generated.");
    } catch (error) {
      setResponse("There was an error generating the response.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-12 font-sans">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12">
        {/* Left Side */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-2">View X Change</h1>
            <p className="text-gray-600 text-lg">
              Explore different perspectives on any topic or idea you type in.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              placeholder="Type your topic or statement here..."
              className="w-full border border-gray-300 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              value={formData.text}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button
              type="submit"
              className="w-full bg-black text-white text-lg font-medium py-4 rounded-xl hover:bg-gray-900 transition duration-200 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="loader ease-linear rounded-full border-4 border-t-4 border-white h-5 w-5 mr-2 animate-spin"></span>
              ) : null}
              {loading ? "Generating..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Response</h2>
          {loading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">
              {response || "The generated perspective will appear here..."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}