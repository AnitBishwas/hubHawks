const registerUser = async (payload) => {
  try {
    const url = `/api/auth/register`;
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await request.json();
    return res;
  } catch (err) {
    throw new Error("❌ Failed to register new user reason -->" + err.message);
  }
};
const loginUser = async (payload) => {
  try {
    const url = "/api/auth/login";
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await request.json();
    return res;
  } catch (err) {
    throw new Error("❌ Failed to login user reason -->" + err.message);
  }
};
const logoutUser = async () =>{
    try{
        const url = `/api/auth/logout`;
        const request = await fetch(url,{
            method: 'POST',
            body: JSON.stringify({})
        });
        const res = await request.json();
        if(!res.ok){
            throw new Error("Failed to logout user");
        };
        return res;
    }catch(err){
        throw new Error("❌ Failed to logout user reason -->" + err.message);
    }
}
const getUser = async () => {
  try {
    const url = "/profile/user";
    const request = await fetch(url);
    const data = await request.json();
    if (!data.ok) {
      throw new Error("No user found");
    }
    return data;
  } catch (err) {
    throw new Error("❌ Failed to get user reason -->" + err.message);
  }
};
export { registerUser, getUser,loginUser,logoutUser };
