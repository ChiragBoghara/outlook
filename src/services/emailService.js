const BASE_URL = "https://flipkart-email-mock.now.sh";

export const getEmails = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) throw new Error("Failed to fetch emails");
    const data = await response.json();
    return {
      emails: data.list,
    };
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};

export const getEmailBody = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/?id=${id}`);
    if (!response.ok) throw new Error("Failed to fetch email body");
    const data = await response.json();
    return data.body || "";
  } catch (error) {
    console.error("Error fetching email body:", error);
    throw error;
  }
};