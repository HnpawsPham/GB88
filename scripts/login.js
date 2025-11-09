const form = document.getElementById("form")

form.addEventListener("submit", function(e) {
    e.preventDefault()

    const inputs = form.querySelectorAll("input")
    const email = inputs[0].value.trim()
    const pass = inputs[1].value.trim()

    const savedEmail = localStorage.getItem("acc_email")
    const savedPass = localStorage.getItem("acc_pass")

    if (email === savedEmail && pass === savedPass) {
        localStorage.setItem("logged_email", email)

        alert("Đăng nhập thành công")
        window.location.href = "../index.html"
    } else {
        alert("Sai tài khoản hoặc mật khẩu")
    }
})
