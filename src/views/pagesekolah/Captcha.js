import React, { useState } from "react";

const Captcha = ({ onVerify }) => {
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");

  // Fungsi untuk menghasilkan kode CAPTCHA baru
  const generateCaptcha = () => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const captcha = Array.from({ length: 6 })
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join("");
    setGeneratedCaptcha(captcha);
  };

  // Panggil generateCaptcha saat komponen pertama kali dirender
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const verifyCaptcha = () => {
    if (inputCaptcha === generatedCaptcha) {
      onVerify(true);
    } else {
      alert("Captcha salah, silakan coba lagi.");
      generateCaptcha();
      setInputCaptcha("");
      onVerify(false);
    }
  };

  return (
    <div>
      <div>
        <strong>Captcha: {generatedCaptcha}</strong>
      </div>
      <input
        type="text"
        value={inputCaptcha}
        onChange={(e) => setInputCaptcha(e.target.value)}
        placeholder="Masukkan Captcha"
      />
      <button onClick={verifyCaptcha}>Verifikasi</button>
    </div>
  );
};

export default Captcha;
