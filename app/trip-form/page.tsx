"use client";

import { useState } from "react";

const labels = {
  en: {
    title: "Team Trip Registration",
    subtitle: "Please fill in your details carefully. All fields are required.",
    firstNameEn: "First Name (English)",
    lastNameEn: "Last Name (English)",
    firstNameBg: "First Name (Bulgarian)",
    lastNameBg: "Last Name (Bulgarian)",
    personalId: "Personal ID Number",
    invitedBy: "Invited By",
    invitedByPlaceholder: "Full name of the person who invited you",
    docType: "Document Type",
    docTypePersonalId: "Personal ID",
    docTypePassport: "Passport",
    docNumber: "Document Number",
    docValidThrough: "Document Valid Through",
    email: "Email Address",
    phone: "Phone Number",
    submit: "Submit Registration",
    submitting: "Submitting...",
    success: "Registration submitted successfully!",
    successSub: "Your information has been recorded. Safe travels!",
    error: "Something went wrong. Please try again.",
    placeholderFirstEn: "e.g. Ivan",
    placeholderLastEn: "e.g. Petrov",
    placeholderFirstBg: "напр. Иван",
    placeholderLastBg: "напр. Петров",
  },
  bg: {
    title: "Регистрация за Служебно Пътуване",
    subtitle: "Моля, попълнете данните си внимателно. Всички полета са задължителни.",
    firstNameEn: "Собствено Име (на английски)",
    lastNameEn: "Фамилия (на английски)",
    firstNameBg: "Собствено Име (на български)",
    lastNameBg: "Фамилия (на български)",
    personalId: "ЕГН",
    invitedBy: "Поканен от",
    invitedByPlaceholder: "Пълно име на поканилото ви лице",
    docType: "Вид на документа",
    docTypePersonalId: "Лична Карта",
    docTypePassport: "Паспорт",
    docNumber: "Номер на документа",
    docValidThrough: "Документът е валиден до",
    email: "Имейл адрес",
    phone: "Телефонен номер",
    submit: "Изпрати регистрацията",
    submitting: "Изпращане...",
    success: "Регистрацията е изпратена успешно!",
    successSub: "Данните ви са записани. Приятно пътуване!",
    error: "Нещо се обърка. Моля, опитайте отново.",
    placeholderFirstEn: "напр. Ivan",
    placeholderLastEn: "напр. Petrov",
    placeholderFirstBg: "напр. Иван",
    placeholderLastBg: "напр. Петров",
  },
};

type Lang = "en" | "bg";

export default function TripFormPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    firstNameEn: "",
    lastNameEn: "",
    firstNameBg: "",
    lastNameBg: "",
    personalId: "",
    invitedBy: "",
    docType: "personalId",
    docNumber: "",
    docValidThrough: "",
    email: "",
    phone: "",
  });

  const t = labels[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/submit-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>{t.success}</h2>
          <p>{t.successSub}</p>
        </div>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="page">
        <div className="lang-toggle">
          <button
            onClick={() => setLang("en")}
            className={lang === "en" ? "active" : ""}
          >EN</button>
          <button
            onClick={() => setLang("bg")}
            className={lang === "bg" ? "active" : ""}
          >БГ</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="logo-mark">✈</div>
            <h1>{t.title}</h1>
            <p className="subtitle">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="section-label">— {lang === "en" ? "Personal Information" : "Лична Информация"} —</div>

            <div className="grid-2">
              <div className="field">
                <label>{t.firstNameEn}</label>
                <input name="firstNameEn" value={form.firstNameEn} onChange={handleChange}
                  placeholder={t.placeholderFirstEn} required />
              </div>
              <div className="field">
                <label>{t.lastNameEn}</label>
                <input name="lastNameEn" value={form.lastNameEn} onChange={handleChange}
                  placeholder={t.placeholderLastEn} required />
              </div>
              <div className="field">
                <label>{t.firstNameBg}</label>
                <input name="firstNameBg" value={form.firstNameBg} onChange={handleChange}
                  placeholder={t.placeholderFirstBg} required />
              </div>
              <div className="field">
                <label>{t.lastNameBg}</label>
                <input name="lastNameBg" value={form.lastNameBg} onChange={handleChange}
                  placeholder={t.placeholderLastBg} required />
              </div>
            </div>

            <div className="grid-2">
              <div className="field">
                <label>{t.personalId}</label>
                <input name="personalId" value={form.personalId} onChange={handleChange}
                  placeholder="0011223344" required />
              </div>
              <div className="field">
                <label>{t.invitedBy}</label>
                <input name="invitedBy" value={form.invitedBy} onChange={handleChange}
                  placeholder={t.invitedByPlaceholder} required />
              </div>
            </div>

            <div className="section-label">— {lang === "en" ? "Travel Document" : "Документ за Пътуване"} —</div>

            <div className="grid-2">
              <div className="field">
                <label>{t.docType}</label>
                <select name="docType" value={form.docType} onChange={handleChange} required>
                  <option value="personalId">{t.docTypePersonalId}</option>
                  <option value="passport">{t.docTypePassport}</option>
                </select>
              </div>
              <div className="field">
                <label>{t.docNumber}</label>
                <input name="docNumber" value={form.docNumber} onChange={handleChange}
                  placeholder="A1234567" required />
              </div>
              <div className="field">
                <label>{t.docValidThrough}</label>
                <input name="docValidThrough" type="date" value={form.docValidThrough}
                  onChange={handleChange} required />
              </div>
            </div>

            <div className="section-label">— {lang === "en" ? "Contact Details" : "Контакти"} —</div>

            <div className="grid-2">
              <div className="field">
                <label>{t.email}</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="ivan@company.com" required />
              </div>
              <div className="field">
                <label>{t.phone}</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder="+359 88 888 8888" required />
              </div>
            </div>

            {status === "error" && (
              <div className="error-msg">{t.error}</div>
            )}

            <button type="submit" className="submit-btn" disabled={status === "submitting"}>
              {status === "submitting" ? t.submitting : t.submit}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --bg: #f5f0eb;
    --card: #fffdf9;
    --ink: #1a1612;
    --ink-light: #6b6258;
    --accent: #c9522a;
    --accent-light: #f0e8e3;
    --border: #ddd5cc;
    --shadow: 0 2px 40px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body { font-family: 'DM Sans', sans-serif; }

  .page {
    min-height: 100vh;
    background: var(--bg);
    background-image: radial-gradient(circle at 20% 50%, rgba(201,82,42,0.04) 0%, transparent 60%),
                      radial-gradient(circle at 80% 20%, rgba(201,82,42,0.06) 0%, transparent 50%);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 16px;
    position: relative;
  }

  .lang-toggle {
    position: fixed;
    top: 24px;
    right: 24px;
    display: flex;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0,0,0,0.08);
    z-index: 100;
  }

  .lang-toggle button {
    padding: 8px 16px;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-light);
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.04em;
  }

  .lang-toggle button.active {
    background: var(--accent);
    color: #fff;
  }

  .card {
    width: 100%;
    max-width: 700px;
    background: var(--card);
    border-radius: 16px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .card-header {
    padding: 48px 48px 36px;
    border-bottom: 1px solid var(--border);
    text-align: center;
    background: linear-gradient(180deg, var(--accent-light) 0%, var(--card) 100%);
  }

  .logo-mark {
    font-size: 28px;
    margin-bottom: 16px;
    display: block;
  }

  .card-header h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.01em;
    margin-bottom: 10px;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 14px;
    color: var(--ink-light);
    font-weight: 300;
    line-height: 1.6;
  }

  .form {
    padding: 40px 48px 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .section-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    text-align: center;
    margin: 8px 0 -8px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .field label {
    font-size: 12px;
    font-weight: 500;
    color: var(--ink-light);
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .field input,
  .field select {
    padding: 11px 14px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: #faf8f6;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .field input::placeholder {
    color: #bbb4ac;
  }

  .field input:focus,
  .field select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(201,82,42,0.1);
    background: #fff;
  }

  .field select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b6258' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }

  .submit-btn {
    margin-top: 8px;
    padding: 16px;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
    box-shadow: 0 4px 14px rgba(201,82,42,0.3);
  }

  .submit-btn:hover:not(:disabled) {
    background: #b3461f;
    box-shadow: 0 6px 20px rgba(201,82,42,0.35);
    transform: translateY(-1px);
  }

  .submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .submit-btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .error-msg {
    background: #fef2f0;
    border: 1px solid #f5c6bc;
    color: #c9522a;
    padding: 12px 16px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
  }

  .success-card {
    background: var(--card);
    border-radius: 16px;
    padding: 64px 48px;
    text-align: center;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
    max-width: 420px;
    width: 100%;
    animation: fadeUp 0.4s ease both;
  }

  .success-icon {
    width: 64px;
    height: 64px;
    background: var(--accent);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    margin: 0 auto 24px;
    box-shadow: 0 8px 24px rgba(201,82,42,0.3);
  }

  .success-card h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    color: var(--ink);
    margin-bottom: 12px;
  }

  .success-card p {
    font-size: 14px;
    color: var(--ink-light);
    line-height: 1.6;
  }

  @media (max-width: 580px) {
    .card-header { padding: 36px 24px 28px; }
    .form { padding: 28px 24px 36px; }
    .grid-2 { grid-template-columns: 1fr; }
    .card-header h1 { font-size: 1.5rem; }
  }
`;
