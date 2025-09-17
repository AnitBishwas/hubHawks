import React, { useState, useEffect } from "react";
// import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "./firebase"; // <- update this path to your firebase config
// import { generateUniqueId } from "./generateUniqueId";
import "./BeFreelancer.css";

export default function BeFreelancer({ onClose }) {
  const [step, setStep] = useState(1);
  const [freelancerType, setFreelancerType] = useState("");
  const [experience, setExperience] = useState("");
  const [howDoneBefore, setHowDoneBefore] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    language: "",
    occupation: "",
    categories: "",
    link: "",
    work: "",
    email: "",
    phone: "",
  });

  // free-text value when user selects "Others"
  const [otherOccupation, setOtherOccupation] = useState("");

  useEffect(() => {
    // lock scroll on mount
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const storedRole = localStorage.getItem("userRole");
    const storedId = localStorage.getItem("uniqueId");
    if (storedRole === "beSniper" && storedId) {
      setStep(1);
    }
    return () => {
      // restore on unmount
      document.body.style.overflow = prevOverflow || "auto";
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleMainSubmit = () => {
    if (!freelancerType) {
      setErrors((prev) => ({
        ...prev,
        freelancerType: "Please select your freelancer type.",
      }));
      return;
    }
    setErrors((prev) => {
      const { freelancerType: _drop, ...rest } = prev;
      return rest;
    });
    setStep(2);
  };

  const handlePeopleStep = () => {
    if (!experience.trim() || isNaN(experience) || Number(experience) < 0) {
      setErrors((prev) => ({
        ...prev,
        experience: "Experience must be a valid number.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, experience: "" }));
    setStep(3);
  };

  const handleDoneBeforeStep = () => {
    if (!howDoneBefore) {
      setErrors((prev) => ({
        ...prev,
        howDoneBefore: "Please select one option.",
      }));
      return;
    }
    setErrors((prev) => {
      const { howDoneBefore: _drop, ...rest } = prev;
      return rest;
    });
    setStep(4);
  };

  const handleDetailsSubmit = async () => {
    if (isSubmitting) return;

    const newErrors = {};
    const {
      name,
      bio,
      language,
      occupation,
      categories,
      link,
      work,
      email,
      phone,
    } = formData;

    // --- VALIDATION ---
    if (!name.trim() || name.length < 3)
      newErrors.name = "Full Name must be at least 3 letters.";
    else if (!/^[A-Za-z\s]+$/.test(name))
      newErrors.name = "Full Name can only contain letters and spaces.";

    if (!bio.trim() || bio.length < 150 || /[\d]{10}|@|\+91/.test(bio))
      newErrors.bio = "Bio must be 150+ characters and without contact info.";

    if (!language.trim()) newErrors.language = "Languages Known is required.";

    if (!occupation.trim()) {
      newErrors.occupation = "Occupation is required.";
    } else if (occupation === "Others") {
      if (!otherOccupation.trim() || otherOccupation.trim().length < 2) {
        newErrors.otherOccupation = "Please specify your occupation.";
      }
    }

    if (!link.trim() || !isValidURL(link))
      newErrors.link = "Enter valid Portfolio Link.";
    if (!work.trim() || !isValidURL(work))
      newErrors.work = "Enter valid Work Link.";

    if (!email.trim() || !isValidEmail(email))
      newErrors.email = "Enter valid Email.";
    if (!isValidPhone(phone))
      newErrors.phone = "Phone must be 10–15 digits (numbers only).";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => {
        // focus first error element
        const el = document.querySelector(`[data-error="true"]`);
        if (el && typeof el.scrollIntoView === "function") {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        console.warn("Validation blocked submit:", newErrors);
      }, 0);
      return;
    }

    // --- FIRESTORE WRITES ---
    try {
      setIsSubmitting(true);

      const role = "beSniper";
      const uniqueId = await generateUniqueId(name, email, role);

      const occupationToSave =
        occupation === "Others" ? otherOccupation.trim() : occupation;
      const occupationRaw = occupation;

      const userDoc = {
        ...formData,
        occupation: occupationToSave,
        occupationRaw,
        email: email.toLowerCase(),
        name,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      };

      const beSniperDoc = {
        ...formData,
        occupation: occupationToSave,
        occupationRaw,
        freelancerType,
        experience,
        howDoneBefore,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", email.toLowerCase()), userDoc);
      await addDoc(collection(db, "be-sniper-forms"), beSniperDoc);

      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("userRole", role);

      setSuccessMsg("Submitted successfully!");
      setIsSubmitting(false);

      // replace Next.js router.push
      window.location.href = "/components/successfull";
    } catch (error) {
      setIsSubmitting(false);
      alert("❌ Submission failed. Check console for details.");
      console.error("Firebase error:", error);
    }
  };

  const languageOptions = [
    "English",
    "Hindi",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Urdu",
    "Spanish",
    "French",
    "German",
    "Other",
  ];

  const occupationOptions = [
    "Graphic Designers / Graphic Designing",
    "Copywriters / Copywriting",
    "Copy Editors / Copy Editing",
    "Proofreaders / Proofreading",
    "Beta Readers / Beta Reading",
    "Translators / Translation",
    "Illustrators / Illustration",
    "Ghost Writers / Ghost Writing",
    "Voice Over Artists / Voice Over",
    "Video Editors / Video Editing",
    "Typesetter / Typesetting",
    "Literary Agents / Literary Representation",
    "Social Media Managers / Social Media Management",
    "Amazon Marketing Executives / Amazon Marketing Services",
    "Full Stack Developers / Web Development",
    "Content Writers / Content Writing",
    "Emcees / Event Coordination",
    "Others",
  ];

  return (
    <>
      {/* overlay WITHOUT outside click-to-close */}
      <div style={sx.overlay}>
        <div
          style={sx.container}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="be-sniper-title"
        >
          {/* Explicit Cancel button to close */}
          <button style={sx.closeBtn} onClick={onClose} aria-label="Cancel">
            ×
          </button>

          <div style={sx.page}>
            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h3 id="be-sniper-title" style={sx.question}>
                  What kind of freelancer are you?
                </h3>

                <div style={sx.optionsRow}>
                  {[
                    { value: "agency-employer", label: "Agency / Employer" },
                    { value: "side-hustle", label: "Side Hustle" },
                    { value: "solo-freelancer", label: "Solo Freelancer" },
                  ].map((option) => {
                    const selected = freelancerType === option.value;
                    const hasError = !!errors.freelancerType;
                    return (
                      <label
                        key={option.value}
                        style={{
                          ...sx.option,
                          ...(selected ? sx.optionSelected : {}),
                          ...(hasError ? sx.optionError : {}),
                        }}
                      >
                        <input
                          type="radio"
                          name="freelancerType"
                          value={option.value}
                          onChange={() => {
                            setFreelancerType(option.value);
                            setErrors((prev) => ({
                              ...prev,
                              freelancerType: "",
                            }));
                          }}
                          style={sx.hiddenRadio}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>

                {errors.freelancerType && (
                  <p style={sx.errorText}>{errors.freelancerType}</p>
                )}

                <div style={sx.navRow}>
                  <button style={sx.primaryBtn} onClick={handleMainSubmit}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h3 style={sx.question}>What is your work experience?</h3>
                <div style={sx.fieldsCol}>
                  <input
                    type="number"
                    name="experience"
                    placeholder="e.g., 3"
                    value={experience}
                    onChange={(e) => {
                      setExperience(e.target.value);
                      setErrors((prev) => ({ ...prev, experience: "" }));
                    }}
                    style={{
                      ...sx.input,
                      ...(errors.experience ? sx.inputError : {}),
                    }}
                    data-error={errors.experience ? "true" : "false"}
                    autoComplete="off"
                  />
                  {errors.experience && (
                    <p style={sx.errorText}>{errors.experience}</p>
                  )}
                </div>
                <div style={sx.navRow}>
                  <button style={sx.ghostBtn} onClick={() => setStep(1)}>
                    Prev
                  </button>
                  <button style={sx.primaryBtn} onClick={handlePeopleStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h3 style={sx.question}>
                  Have you done freelance work before?
                </h3>
                <div style={sx.optionsRow}>
                  {[
                    "Getting Started",
                    "Done Offline Before",
                    "Done Online Before",
                    "Both Online & Offline",
                  ].map((label) => {
                    const selected = howDoneBefore === label;
                    return (
                      <label
                        key={label}
                        style={{
                          ...sx.option,
                          ...(selected ? sx.optionSelected : {}),
                        }}
                      >
                        <input
                          type="radio"
                          name="howDoneBefore"
                          value={label}
                          onChange={() => {
                            setHowDoneBefore(label);
                            setErrors((prev) => ({
                              ...prev,
                              howDoneBefore: "",
                            }));
                          }}
                          style={sx.hiddenRadio}
                        />
                        <span>{label}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.howDoneBefore && (
                  <p style={sx.errorText}>{errors.howDoneBefore}</p>
                )}
                <div style={sx.navRow}>
                  <button style={sx.ghostBtn} onClick={() => setStep(2)}>
                    Prev
                  </button>
                  <button style={sx.primaryBtn} onClick={handleDoneBeforeStep}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div style={sx.formShell}>
                <div style={sx.formScroll}>
                  <h3 style={sx.question}>Please fill in your details</h3>
                  {successMsg && <p style={sx.successText}>{successMsg}</p>}

                  <div style={sx.fieldsCol}>
                    {[
                      { name: "name", label: "Full Name *Private" },
                      {
                        name: "bio",
                        label: "Bio *No contact info (Chars Limit:- Min 150)",
                      },
                      {
                        name: "language",
                        label: "Languages Known",
                        type: "select",
                        options: languageOptions,
                      },
                      {
                        name: "occupation",
                        label: "Occupation",
                        type: "select",
                        options: occupationOptions,
                      },
                      { name: "link", label: "Portfolio Link" },
                      {
                        name: "work",
                        label: "Best Work Link *No contact info",
                      },
                      { name: "email", label: "Email *Private" },
                      { name: "phone", label: "Phone Number *Active" },
                    ].map((field, idx) => {
                      const hasError = !!errors[field.name];
                      return (
                        <div key={idx} style={sx.formGroup}>
                          <label style={sx.inputLabel}>{field.label}</label>

                          {field.type === "select" ? (
                            <select
                              name={field.name}
                              value={formData[field.name] || ""}
                              onChange={(e) => {
                                handleInputChange(e);
                                if (
                                  field.name === "occupation" &&
                                  e.target.value !== "Others"
                                ) {
                                  setOtherOccupation("");
                                  setErrors((prev) => ({
                                    ...prev,
                                    otherOccupation: "",
                                  }));
                                }
                              }}
                              style={{
                                ...sx.select,
                                ...(hasError ? sx.inputError : {}),
                              }}
                              autoComplete="off"
                              data-error={hasError ? "true" : "false"}
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.name === "email" ? "email" : "text"}
                              name={field.name}
                              placeholder={field.label}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              style={{
                                ...sx.input,
                                ...(hasError ? sx.inputError : {}),
                              }}
                              autoComplete="off"
                              data-error={hasError ? "true" : "false"}
                            />
                          )}

                          {errors[field.name] && (
                            <p style={sx.errorText}>{errors[field.name]}</p>
                          )}

                          {field.name === "occupation" &&
                            formData.occupation === "Others" && (
                              <div style={{ ...sx.formGroup, marginTop: 8 }}>
                                <label style={sx.inputLabel}>
                                  Please specify your occupation
                                </label>
                                <input
                                  type="text"
                                  name="otherOccupation"
                                  placeholder="e.g., Book Publicist"
                                  value={otherOccupation}
                                  onChange={(e) => {
                                    setOtherOccupation(e.target.value);
                                    setErrors((prev) => ({
                                      ...prev,
                                      otherOccupation: "",
                                    }));
                                  }}
                                  style={{
                                    ...sx.input,
                                    ...(errors.otherOccupation
                                      ? sx.inputError
                                      : {}),
                                  }}
                                  autoComplete="off"
                                  data-error={
                                    errors.otherOccupation ? "true" : "false"
                                  }
                                />
                                {errors.otherOccupation && (
                                  <p style={sx.errorText}>
                                    {errors.otherOccupation}
                                  </p>
                                )}
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>

                  <div style={sx.navRow}>
                    <button style={sx.ghostBtn} onClick={() => setStep(3)}>
                      Prev
                    </button>
                    <button
                      style={sx.primaryBtn}
                      onClick={handleDetailsSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* --- validators (unchanged) --- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[0-9]{10,15}$/.test(phone);
}
function isValidURL(url) {
  return /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);
}

/* ---- Inline styles ---- */
const sx = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 9999,
  },
  container: {
    position: "relative",
    width: "100%",
    maxWidth: 720,
    maxHeight: "90vh",
    background: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    padding: 24,
    overflow: "hidden",
  },
  closeBtn: {
    position: "absolute",
    top: 8,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontSize: 20,
    lineHeight: "20px",
  },
  page: { display: "block" },
  question: {
    margin: "0 0 16px",
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
  },
  optionsRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  option: {
    border: "1px solid #e5e7eb",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    userSelect: "none",
    background: "#fff",
    transition: "all .2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
  optionSelected: {
    borderColor: "#111827",
    background: "#f3f4f6",
    fontWeight: 600,
  },
  optionError: {
    outline: "2px solid #ef4444",
  },
  hiddenRadio: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
  },
  navRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 16,
  },
  primaryBtn: {
    background: "#111827",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  ghostBtn: {
    background: "#fff",
    color: "#111827",
    padding: "10px 16px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    cursor: "pointer",
    fontWeight: 600,
  },
  fieldsCol: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    outline: "none",
    background: "#fff",
  },
  inputError: {
    borderColor: "#ef4444",
    outline: "2px solid #fee2e2",
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 13,
    marginTop: 6,
  },
  successText: {
    color: "#065f46",
    fontSize: 14,
    margin: "6px 0 10px",
  },
  formGroup: { display: "flex", flexDirection: "column" },
  inputLabel: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
    fontWeight: 600,
  },
  formShell: { display: "block" },
  formScroll: {
    maxHeight: "60vh",
    overflowY: "auto",
    paddingRight: 4,
  },
};
