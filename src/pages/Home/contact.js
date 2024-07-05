import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

function Contact() {
  const { loading, portfolioData } = useSelector(state => state.root);
  const { contact = {} } = portfolioData || {};
  const navigate = useNavigate();
  return (
    <div id="contact">
      <SectionTitle title="Say Hello" />
      {portfolioData?.contact ? <div className="flex sm:flex-col items-center justify-between">
        <div className="flex flex-col">
          <p className="text-tertiary">{"{"}</p>
          {Object.keys(contact).map((key) => (
            <p className="ml-5">
              <span className="text-tertiary text-xl">{key}: </span>
              <span className="text-tertiary text-xl">{contact[key]}</span>
            </p>
          ))}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[350px] sm:ml-0">
          <img src='/contact.png' alt="Contact" />
        </div>
      </div> : (
        <>
          {/* <h1 className='text-white text-xl'>No Contact Found</h1> */}
          <button className="text-lg bg-primary text-white border p-2 rounded" onClick={() => navigate('/admin', { state: { activeIndex: "5" } })}>
            Add Contact
          </button>
        </>)}
    </div>
  );
}
export default Contact;