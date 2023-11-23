const passwordCheck = () => {
    const password = prompt("Zadejte heslo")
    if(!password) {
      alert("Heslo nesmí být prázdné");
      return false;
    }
    if(password !== import.meta.env.VITE_PASS){
      alert("špatné heslo");
      return false;
    }
    return true;
}

export default passwordCheck;