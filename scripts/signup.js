const form = document.getElementById("form")

form.addEventListener("submit", function(e) {
    e.preventDefault()

    const inputs = form.querySelectorAll("input")
    const email = inputs[0].value.trim()
    const pass = inputs[1].value.trim()
    const repass = inputs[2].value.trim()

    if (!email || !pass || !repass) {
        alert("Vui lòng nhập đầy đủ thông tin")
        return
    }

    if (pass !== repass) {
        alert("Mật khẩu không khớp")
        return
    }

    localStorage.setItem("acc_email", email)
    localStorage.setItem("acc_pass", pass)

    alert("Tạo tài khoản thành công")
    window.location.href = "./login.html"
})
