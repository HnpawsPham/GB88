const email = localStorage.getItem("logged_email")
const btn = document.getElementById("login-btn")

// check device
const isMobile = /Mobi|Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)

if (isMobile) {
    alert("Chỉ được truy cập trên máy tính, vui lòng dùng desktop!")
    window.location.href = "./pages/not-supported.html"
} 
else if (email && btn) {
    const username = email.split("@")[0]
    btn.textContent = username
    btn.removeAttribute("href")
}
