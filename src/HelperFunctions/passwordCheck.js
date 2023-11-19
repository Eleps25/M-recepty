const passwordCheck = () => {
    const password = prompt("Zadejte heslo")
    if(!password) {
      alert("Heslo nesmí být prázdné");
      return false;
    }
    if(password !== "Test"){
      alert("špatné heslo");
      return false;
    }
    return true;
}

export default passwordCheck;