import React, { useState, useRef, useEffect } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useServerStatus } from "../hooks/useServerStatus";
import { contact } from "../services/api";
import {
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { gsap } from "gsap";

function Contact() {
  const [ref, isVisible] = useIntersectionObserver();
  const { serverAwake } = useServerStatus();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const formRef = useRef(null);

  // Load message count from localStorage on mount
  useEffect(() => {
    const count = parseInt(
      localStorage.getItem("contactFormMessageCount") || "0",
    );
    setMessageCount(count);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await contact(formData);
      if (response.success || response) {
        setSubmitStatus("success");

        // Update message count
        const newCount = messageCount + 1;
        setMessageCount(newCount);
        localStorage.setItem("contactFormMessageCount", newCount.toString());

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Animate success message
        gsap.fromTo(
          ".success-message",
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5 },
        );

        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      label: "Phone",
      value: "7355026966",
      link: "tel:7355026966",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "anubhavsingh2027@gmail.com",
      link: "mailto:anubhavsingh2027@gmail.com",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "Send Me Direct Message",
      link: "https://api.whatsapp.com/send?phone=7355026966",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Remote work also available",
      link: "#",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="min-h-screen flex items-center py-20 px-4 md:px-6 bg-gradient-to-b from-dark-bg to-dark-secondary"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto" />
        </div>

        {/* Availability Status */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-2 px-4 py-2 bg-neon-cyan/10 rounded-full border border-neon-cyan/30">
            <div
              className={`w-2 h-2 rounded-full animate-pulse ${serverAwake ? "bg-neon-cyan" : "bg-red-500"}`}
            />
            <span
              className={`font-medium ${serverAwake ? "text-neon-cyan" : "text-red-500"}`}
            >
              {serverAwake ? "Available for Projects" : "Server Loading..."}
            </span>
          </div>
          <p className="text-black">Within 12 hours response time</p>
        </div>

        {/* Content Grid */}
        {isVisible && (
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black mb-8">
                Contact Information
              </h3>

              {contactInfo.map((item, idx) => {
                const Icon = item.icon;
                const isLocation = item.link === "#";
                return isLocation ? (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-dark-secondary/50 rounded-lg border border-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition group"
                  >
                    <Icon className="text-neon-cyan text-2xl group-hover:scale-110 transition flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-black text-sm">{item.label}</p>
                      <p className="text-black font-medium">{item.value}</p>
                    </div>
                  </div>
                ) : (
                  <a
                    key={idx}
                    href={item.link}
                    target={item.link.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-start gap-4 p-4 bg-dark-secondary/50 rounded-lg border border-neon-cyan/20 hover:border-neon-cyan/50 hover:shadow-neon-cyan transition group"
                  >
                    <Icon className="text-neon-cyan text-2xl group-hover:scale-110 transition flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-black text-sm">{item.label}</p>
                      <p className="text-black font-medium">{item.value}</p>
                    </div>
                  </a>
                );
              })}

              {/* Stats */}
              <div className="mt-12 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-dark-secondary/50 rounded-lg border border-neon-cyan/20">
                  <FaCheckCircle className="text-neon-cyan text-2xl" />
                  <div>
                    <p className="text-black text-sm">Response Rate</p>
                    <p className="text-black font-bold">100%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-dark-secondary/50 rounded-lg border border-neon-cyan/20">
                  <FaCheckCircle className="text-neon-cyan text-2xl" />
                  <div>
                    <p className="text-black text-sm">Average Response</p>
                    <p className="text-black font-bold">2 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-dark-secondary/50 rounded-lg border border-neon-cyan/20">
                  <FaCheckCircle className="text-neon-cyan text-2xl" />
                  <div>
                    <p className="text-black text-sm">Projects Delivered</p>
                    <p className="text-black font-bold">15+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-black">
                  Send me a Message
                </h3>
                <div className="flex items-center gap-3">
                  {/* Server Status Badge */}
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border ${
                      serverAwake
                        ? "bg-neon-cyan/10 border-neon-cyan/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        serverAwake ? "bg-neon-cyan" : "bg-red-500"
                      } animate-pulse`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        serverAwake ? "text-neon-cyan" : "text-red-400"
                      }`}
                    >
                      {serverAwake ? "Active" : "Loading..."}
                    </span>
                  </div>

                  {/* Message Counter Badge */}
                  {messageCount > 0 && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30">
                      <span className="text-xs font-bold text-neon-purple">
                        {messageCount}{" "}
                        {messageCount === 1 ? "message" : "messages"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {submitStatus === "success" && (
                <div className="success-message mb-4 p-4 bg-neon-cyan/10 border border-neon-cyan/50 rounded-lg">
                  <p className="text-neon-cyan font-medium">
                    ✓ Message sent successfully!
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 font-medium">
                    ✗ Error sending message. Please try again.
                  </p>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                {/* Name/Username Field */}
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-neon-cyan/20 rounded-lg text-black placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition"
                />

                {/* Email Field */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-neon-cyan/20 rounded-lg text-black placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition"
                />

                {/* Phone Field */}
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-neon-cyan/20 rounded-lg text-black placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition"
                />

                {/* Subject Field */}
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-neon-cyan/20 rounded-lg text-black placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition"
                />

                {/* Message Field */}
                <textarea
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-dark-secondary/50 border border-neon-cyan/20 rounded-lg text-black placeholder-gray-500 focus:border-neon-cyan focus:outline-none transition resize-none"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !serverAwake}
                  className="w-full px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-bold rounded-lg hover:shadow-lg hover:shadow-neon-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span> Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>✈️</span>
                    </>
                  )}
                </button>

                {!serverAwake && (
                  <p className="text-xs text-red-400 text-center">
                    ⚠️ Server is loading. Please wait a moment before sending.
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
