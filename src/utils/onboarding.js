const API = "http://localhost:8081/api/v1";

export async function updateOnboardingStatus(status) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API}/users/me/onboarding`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (response.status === 401 || response.status === 403) {
    throw new Error("UNAUTHORIZED");
  }
  if (!response.ok) {
    throw new Error("Could not save onboarding status");
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  localStorage.setItem(
    "user",
    JSON.stringify({ ...user, onboardingStatus: status }),
  );
}
