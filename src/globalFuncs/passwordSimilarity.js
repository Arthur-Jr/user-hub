const handlePasswordSimilarity = (userData) => {
  return (
    userData.password.length > 0 &&
    userData.confirmPassword.length > 0 &&
    userData.password === userData.confirmPassword
  )
}

export default handlePasswordSimilarity;
