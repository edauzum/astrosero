"use client";
import React, { useMemo, useState } from "react";

const packages = [
  {
    id: "basic",
    name: "Tek Horary Sorusu",
    price: 790,
    old: 990,
    desc: "Net, tek bir konu için horary analizi.",
    delivery: "24-48 saat",
    features: ["1 soru", "Kısa yorum", "Zamanlama yorumu", "PDF cevap"]
  },
  {
    id: "deep",
    name: "Detaylı Horary Analizi",
    price: 1490,
    old: 1890,
    desc: "İlişki, kariyer, taşınma, kayıp eşya gibi konular için derin analiz.",
    delivery: "24 saat öncelikli",
    features: ["1 ana soru + 2 alt konu", "Detaylı yorum", "Harita göstergeleri", "PDF + e-posta cevap"]
  },
  {
    id: "vip",
    name: "VIP Acil Horary",
    price: 2490,
    old: 2990,
    desc: "Acil cevap gereken sorular için öncelikli değerlendirme.",
    delivery: "6-12 saat",
    features: ["Acil öncelik", "Detaylı yorum", "Sesli özet notu", "Öncelikli destek"]
  }
];

const questionTypes = [
  "İlişki / Aşk",
  "Kariyer / İş",
  "Para / Yatırım",
  "Taşınma / Seyahat",
  "Kayıp eşya",
  "Aile / Sosyal",
  "Diğer"
];

function getActivePackage(packageList, selectedId) {
  return packageList.find((item) => item.id === selectedId) || packageList[0];
}

function isValidSubmission(form) {
  return Boolean(
    form.name.trim() &&
      form.email.trim().includes("@") &&
      form.question.trim().length > 12 &&
      form.consent
  );
}

function runSelfTests() {
  const sampleForm = {
    name: "Eda",
    email: "eda@example.com",
    phone: "",
    type: "İlişki / Aşk",
    question: "Bu ilişki benim için doğru mu?",
    consent: true
  };

  const invalidForm = {
    ...sampleForm,
    email: "yanlis-email",
    question: "Kısa",
    consent: false
  };

  return [
    {
      name: "Varsayılan paket bulunur",
      pass: getActivePackage(packages, "deep").price === 1490
    },
    {
      name: "Bilinmeyen paket basic pakete düşer",
      pass: getActivePackage(packages, "unknown").id === "basic"
    },
    {
      name: "Geçerli form gönderilebilir",
      pass: isValidSubmission(sampleForm) === true
    },
    {
      name: "Eksik/hatalı form gönderilemez",
      pass: isValidSubmission(invalidForm) === false
    }
  ];
}

export default function AstroseroWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("deep");
  const [submitted, setSubmitted] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "İlişki / Aşk",
    question: "",
    consent: false
  });

  const activePackage = useMemo(
    () => getActivePackage(packages, selectedPackage),
    [selectedPackage]
  );

  const tests = useMemo(() => runSelfTests(), []);
  const canSubmit = isValidSubmission(form);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitForm = () => {
    if (!canSubmit) return;
    setSubmitted(true);
    setTimeout(() => scrollTo("success"), 80);
  };

  return (
    <div className="min-h-screen bg-[#090714] text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-24 h-96 w-96 rounded-full bg-fuchsia-700/30 blur-3xl" />
        <div className="absolute top-40 right-0 h-[30rem] w-[30rem] rounded-full bg-indigo-700/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <header className="relative z-20 border-b border-white/10 bg-[#090714]/70 backdrop-blur-xl sticky top-0">
        <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 text-left">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-fuchsia-400 via-violet-400 to-amber-200 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
              <Icon name="moon" className="h-6 w-6 text-[#090714]" />
            </div>
            <div>
              <div className="font-black tracking-[0.22em] text-lg">ASTROSERO</div>
              <div className="text-xs text-white/55 -mt-1">Horary Astrology Studio</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-7 text-sm text-white/75">
            <button onClick={() => scrollTo("how")} className="hover:text-white">Nasıl Çalışır?</button>
            <button onClick={() => scrollTo("pricing")} className="hover:text-white">Ücretler</button>
            <button onClick={() => scrollTo("ask")} className="hover:text-white">Soru Sor</button>
            <button onClick={() => scrollTo("faq")} className="hover:text-white">SSS</button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white hover:bg-white/10 transition">Giriş Yap</button>
            <button onClick={() => scrollTo("ask")} className="rounded-2xl bg-white px-5 py-2.5 text-sm font-bold text-[#090714] hover:bg-white/90 transition">Horary Sor</button>
          </div>

          <button className="md:hidden rounded-xl bg-white/10 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menü">
            <Icon name={mobileOpen ? "x" : "menu"} className="h-6 w-6" />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden px-5 pb-5 space-y-3 bg-[#090714]/95">
            {[
              ["how", "Nasıl Çalışır?"],
              ["pricing", "Ücretler"],
              ["ask", "Soru Sor"],
              ["faq", "SSS"]
            ].map(([id, label]) => (
              <button key={id} className="block w-full text-left rounded-xl bg-white/5 p-3 text-white/80" onClick={() => { setMobileOpen(false); scrollTo(id); }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section id="home" className="mx-auto max-w-7xl px-5 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-[fadeIn_0.7s_ease-out]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 mb-6">
              <Icon name="sparkles" className="h-4 w-4 text-amber-200" /> Paralı horary soru alma platformu
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">
              Sorunu sor, <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-amber-100 bg-clip-text text-transparent">gökyüzüyle</span> cevap ara.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/65 leading-relaxed max-w-2xl">
              ASTROSERO; aşk, kariyer, para, taşınma, kayıp eşya ve karar süreçleri için ücretli horary soruları alan modern bir astroloji platformudur. Kullanıcı sorusunu gönderir, paketini seçer, ödeme yapar ve cevabını güvenli şekilde alır.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("ask")} className="rounded-2xl bg-gradient-to-r from-fuchsia-300 to-amber-100 px-7 py-4 font-bold text-[#090714] hover:opacity-90 transition inline-flex items-center justify-center">
                Hemen Soru Sor <Icon name="arrow" className="ml-2 h-4 w-4" />
              </button>
              <button onClick={() => scrollTo("admin")} className="rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white hover:bg-white/10 transition">
                Paneli Gör
              </button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl">
              {["Güvenli ödeme", "PDF cevap", "Mobil uyumlu"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">{item}</div>
              ))}
            </div>
          </div>

          <div className="relative animate-[fadeIn_0.9s_ease-out]">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-400/20 to-amber-200/10 rounded-[2.5rem] blur-2xl" />
            <div className="relative border border-white/10 bg-white/[0.07] backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-8">
              <div className="rounded-[2rem] bg-[#120d27] border border-white/10 p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-sm text-white/50">Canlı Soru Paneli</div>
                    <div className="text-2xl font-bold">Horary Intake</div>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-fuchsia-300/15 flex items-center justify-center">
                    <Icon name="gem" className="h-6 w-6 text-fuchsia-200" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between text-sm text-white/55"><span>Soru tipi</span><span>İlişki</span></div>
                    <div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-fuchsia-300 to-amber-100" /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Stat icon="card" title="Ödeme" value="₺1.490" />
                    <Stat icon="clock" title="Teslim" value="24 saat" />
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="text-sm text-white/50 mb-2">Son gönderilen soru</div>
                    <p className="text-white/80">“Bu ilişki benim için doğru bir yola girer mi?”</p>
                  </div>
                  <button className="w-full rounded-2xl bg-white py-3 font-bold text-[#090714] hover:bg-white/90 transition">Analiz Sırasına Alındı</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto max-w-7xl px-5 py-14">
          <SectionTitle eyebrow="Süreç" title="ASTROSERO nasıl çalışır?" text="Kullanıcı deneyimi basit: soru, paket, ödeme ve cevap." />
          <div className="grid md:grid-cols-4 gap-4 mt-10">
            <Step n="01" icon="help" title="Sorunu yaz" text="Tek, net ve karar odaklı horary sorunu gir." />
            <Step n="02" icon="card" title="Paket seç" text="Analiz seviyesine göre ücretli paketi seç." />
            <Step n="03" icon="lock" title="Ödeme yap" text="Kart/iyzico/Stripe altyapısına uygun ödeme ekranı." />
            <Step n="04" icon="message" title="Cevabı al" text="PDF, e-posta ve panel üzerinden analiz sonucu." />
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-5 py-14">
          <SectionTitle eyebrow="Ücretlendirme" title="Her soru için net paketler" text="Fiyatlar örnektir; canlıya alınırken ödeme altyapısına göre güncellenebilir." />
          <div className="grid lg:grid-cols-3 gap-5 mt-10">
            {packages.map((item) => (
              <button key={item.id} onClick={() => setSelectedPackage(item.id)} className={`text-left rounded-[2rem] border p-6 transition ${selectedPackage === item.id ? "border-fuchsia-200 bg-white/12 shadow-xl shadow-fuchsia-500/10" : "border-white/10 bg-white/[0.055] hover:bg-white/[0.08]"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="mt-2 text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {selectedPackage === item.id && <Icon name="check" className="text-fuchsia-200 shrink-0 h-6 w-6" />}
                </div>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-4xl font-black">₺{item.price.toLocaleString("tr-TR")}</span>
                  <span className="text-white/35 line-through mb-1">₺{item.old.toLocaleString("tr-TR")}</span>
                </div>
                <div className="mt-3 inline-flex rounded-full bg-amber-200/10 px-3 py-1 text-xs text-amber-100">Teslim: {item.delivery}</div>
                <ul className="mt-6 space-y-3">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/70"><Icon name="check" className="h-4 w-4 text-fuchsia-200" /> {feature}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </section>

        <section id="ask" className="mx-auto max-w-7xl px-5 py-16 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
          <div>
            <SectionTitle eyebrow="Soru Formu" title="Horary sorunu gönder" text="Bu bölüm canlı projede backend’e kayıt atar, ödeme sonrası danışman paneline düşer." />
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.07] backdrop-blur-xl p-6 md:p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <Field icon="user" label="Ad Soyad" placeholder="Eda Üzüm" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
                <Field icon="mail" label="E-posta" placeholder="ornek@mail.com" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field icon="phone" label="Telefon" placeholder="+90 ..." value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
                <div>
                  <label className="text-sm text-white/65">Soru Kategorisi</label>
                  <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#100c22] px-4 py-3 text-white outline-none focus:border-fuchsia-200">
                    {questionTypes.map((type) => <option key={type}>{type}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-white/65">Horary Sorun</label>
                <textarea value={form.question} onChange={(event) => setForm({ ...form, question: event.target.value })} placeholder="Örn: Bu iş teklifini kabul edersem benim için doğru olur mu?" rows={6} className="mt-2 w-full rounded-2xl border border-white/10 bg-[#100c22] px-4 py-3 text-white outline-none focus:border-fuchsia-200 resize-none" />
                <div className="mt-2 text-xs text-white/40">Net, tek konuya odaklanan ve karar sorusu şeklindeki sorular daha iyi değerlendirilir.</div>
              </div>
              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
                <input type="checkbox" checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-1" />
                <span>KVKK / gizlilik metnini okudum. Astrolojik yorumların kesin garanti, tıbbi/hukuki/finansal tavsiye olmadığını kabul ediyorum.</span>
              </label>
              <button disabled={!canSubmit} onClick={submitForm} className="w-full rounded-2xl bg-gradient-to-r from-fuchsia-300 to-amber-100 text-[#090714] hover:opacity-90 disabled:opacity-40 py-4 text-base font-black transition inline-flex items-center justify-center">
                Soruyu Gönder ve Ödemeye Geç <Icon name="send" className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-white/10 bg-[#120d27]/90 backdrop-blur-xl overflow-hidden p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-amber-200/15 flex items-center justify-center"><Icon name="card" className="h-6 w-6 text-amber-100" /></div>
                <div>
                  <div className="text-sm text-white/50">Seçili paket</div>
                  <div className="text-xl font-bold">{activePackage.name}</div>
                </div>
              </div>
              <div className="rounded-3xl bg-white/5 border border-white/10 p-5 space-y-4">
                <div className="flex justify-between text-white/65 gap-4"><span>Paket</span><span className="text-right">{activePackage.name}</span></div>
                <div className="flex justify-between text-white/65"><span>Teslim</span><span>{activePackage.delivery}</span></div>
                <div className="flex justify-between text-white/65"><span>Güvenli ödeme</span><span>Aktif</span></div>
                <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                  <span className="text-white/60">Toplam</span>
                  <span className="text-4xl font-black">₺{activePackage.price.toLocaleString("tr-TR")}</span>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                <Trust icon="shield" text="Ödeme sonrası soru otomatik sıraya alınır." />
                <Trust icon="calendar" text="Teslim süresi paket tipine göre değişir." />
                <Trust icon="lock" text="Kişisel bilgiler güvenli şekilde saklanır." />
              </div>
              {submitted && (
                <div id="success" className="mt-6 rounded-3xl border border-emerald-300/25 bg-emerald-300/10 p-5">
                  <div className="flex gap-3">
                    <Icon name="check" className="h-6 w-6 text-emerald-200" />
                    <div>
                      <div className="font-bold">Soru kaydı oluşturuldu.</div>
                      <p className="text-sm text-white/65 mt-1">Demo modunda ödeme simülasyonu hazır. Canlı projede burada Stripe/iyzico ödeme sayfası açılır.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="admin" className="mx-auto max-w-7xl px-5 py-14">
          <SectionTitle eyebrow="Panel" title="Admin ve danışman yönetimi" text="Canlı sistemde gelen sorular, ödeme durumu ve cevap teslimi bu panelden yönetilir." />
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.06] overflow-hidden">
            <div className="grid md:grid-cols-4 border-b border-white/10">
              {[
                ["Bugünkü soru", "18"],
                ["Ödeme tamamlandı", "14"],
                ["Cevap bekleyen", "7"],
                ["VIP acil", "3"]
              ].map(([label, value]) => (
                <div key={label} className="p-6 border-b md:border-b-0 md:border-r border-white/10 last:border-r-0">
                  <div className="text-white/45 text-sm">{label}</div>
                  <div className="text-3xl font-black mt-1">{value}</div>
                </div>
              ))}
            </div>
            <div className="p-5 overflow-x-auto">
              <table className="w-full text-sm min-w-[760px]">
                <thead className="text-white/45 text-left">
                  <tr>
                    <th className="p-3">Kullanıcı</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Paket</th>
                    <th className="p-3">Durum</th>
                    <th className="p-3">Teslim</th>
                  </tr>
                </thead>
                <tbody className="text-white/75">
                  {[
                    ["E*** Ü***", "İlişki", "Detaylı", "Analizde", "24 saat"],
                    ["M*** A***", "Kariyer", "VIP", "Öncelikli", "6 saat"],
                    ["S*** K***", "Para", "Tek Soru", "Ödeme alındı", "48 saat"]
                  ].map((row) => (
                    <tr key={row.join("")} className="border-t border-white/10">
                      <td className="p-3">{row[0]}</td>
                      <td className="p-3">{row[1]}</td>
                      <td className="p-3">{row[2]}</td>
                      <td className="p-3"><span className="rounded-full bg-fuchsia-300/10 px-3 py-1 text-fuchsia-100">{row[3]}</span></td>
                      <td className="p-3">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8">
          <button onClick={() => setShowTests(!showTests)} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/75 hover:bg-white/10 transition">
            Geliştirici Testlerini {showTests ? "Gizle" : "Göster"}
          </button>
          {showTests && (
            <div className="mt-4 grid md:grid-cols-4 gap-3">
              {tests.map((test) => (
                <div key={test.name} className={`rounded-2xl border p-4 text-sm ${test.pass ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100" : "border-red-300/20 bg-red-300/10 text-red-100"}`}>
                  <div className="font-bold">{test.pass ? "Geçti" : "Kaldı"}</div>
                  <div className="mt-1 opacity-75">{test.name}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-5 py-16">
          <SectionTitle eyebrow="SSS" title="Sık sorulanlar" text="Canlıya almadan önce bu alan gizlilik, iade ve kullanım koşullarıyla genişletilir." />
          <div className="mt-8 space-y-4">
            <Faq q="Horary sorusu nasıl olmalı?" a="Tek konuya odaklı, net ve karar sorusu gibi yazılmalı. Örneğin: ‘Bu işe geçmem benim için doğru olur mu?’" />
            <Faq q="Ödeme sonrası ne olur?" a="Soru ödeme sonrası danışman paneline düşer. Paket teslim süresine göre cevap hazırlanır." />
            <Faq q="Bu site canlı ödeme alabilir mi?" a="Evet. React/Next.js frontend, Node.js backend, PostgreSQL veritabanı ve Stripe/iyzico entegrasyonu ile canlıya alınabilir." />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center text-white/45">
        <div className="font-black tracking-[0.22em] text-white">ASTROSERO</div>
        <p className="mt-2 text-sm">Horary astroloji soru alma ve ücretli danışmanlık platformu.</p>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(18px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </footer>
    </div>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <div className="text-white/45 text-xs flex items-center gap-2"><Icon name={icon} className="h-4 w-4" />{title}</div>
      <div className="mt-2 text-xl font-bold">{value}</div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm uppercase tracking-[0.25em] text-fuchsia-200 mb-3">{eyebrow}</div>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight">{title}</h2>
      <p className="mt-4 text-white/60 leading-relaxed">{text}</p>
    </div>
  );
}

function Step({ n, icon, title, text }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] hover:bg-white/[0.09] transition p-6">
      <div className="flex items-center justify-between">
        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-fuchsia-100"><Icon name={icon} className="h-5 w-5" /></div>
        <span className="text-white/25 font-black">{n}</span>
      </div>
      <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/55 leading-relaxed">{text}</p>
    </div>
  );
}

function Field({ icon, label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-white/65">{label}</label>
      <div className="mt-2 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"><Icon name={icon} className="h-4 w-4" /></div>
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-white/10 bg-[#100c22] pl-11 pr-4 py-3 text-white outline-none focus:border-fuchsia-200" />
      </div>
    </div>
  );
}

function Trust({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3 text-sm text-white/60">
      <Icon name={icon} className="h-4 w-4 text-fuchsia-200" />
      <span>{text}</span>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-6">
      <h3 className="font-bold text-lg">{q}</h3>
      <p className="mt-2 text-white/60 leading-relaxed">{a}</p>
    </div>
  );
}

function Icon({ name, className = "h-5 w-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  };

  const icons = {
    moon: <><path d="M12 3a6 6 0 0 0 8.6 7.2A8.5 8.5 0 1 1 12 3Z" /></>,
    sparkles: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" /></>,
    check: <><path d="M20 6 9 17l-5-5" /></>,
    lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" /></>,
    help: <><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 1 1 5.8 1c-.7 1.2-1.9 1.7-2.5 2.7" /><path d="M12 17h.01" /></>,
    gem: <><path d="M6 3h12l4 6-10 12L2 9l4-6Z" /><path d="M2 9h20" /><path d="m12 21 4-12" /><path d="M12 21 8 9" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
    menu: <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>,
    x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
  };

  return <svg {...common}>{icons[name] || icons.sparkles}</svg>;
}
