export async function fetchUserInfo(token) {
  const response = await fetch(
    "https://dev-3rjh7phvs5heb3zn.us.auth0.com/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return await response.json();
}
