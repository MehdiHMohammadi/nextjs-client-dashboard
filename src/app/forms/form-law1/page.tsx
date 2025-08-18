"use client";
import { useState } from 'react';
// import { useRouter } from 'next/router';

const FirmRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firmName: '',
    website: '',
    officeLocation: '',
    yearEstablished: '',
    licenseNumber: '',
    primaryContactName: '',
    designation: '',
    email: '',
    phoneNumber: '',
    practiceAreas: [],
    servicesProvided: [],
    numberOfLawyers: '',
    keyPartners: [{ name: '', specialization: '' }],
    languagesSpoken: [],
    initialConsultation: '',
    collaboration: '',
    preferredClientType: '',
    emiratesServed: [],
    caseManagementSoftware: '',
    communicationTools: [],
    logoPermission: '',
    updatesPermission: '',
  });

  // const router = useRouter();

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev:any):any => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter((item:any) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Save formData to the database or API
    // router.push('/success'); // Redirect to success page
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Firm Registration Form</h1>
      <h2>Basic Information</h2>
      <input name="firmName" placeholder="Firm Name" onChange={handleChange} required />
      <input name="website" placeholder="Website" onChange={handleChange} />
      <input name="officeLocation" placeholder="Office Location(s)" onChange={handleChange} />
      <input name="yearEstablished" placeholder="Year Established" onChange={handleChange} />
      <input name="licenseNumber" placeholder="License Number & Issuing Authority" onChange={handleChange} />

      <h2>Contact Details</h2>
      <input name="primaryContactName" placeholder="Primary Contact Name" onChange={handleChange} required />
      <input name="designation" placeholder="Designation" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />

      <h2>Specialization & Services</h2>
      <select name="practiceAreas" multiple onChange={handleChange}>
        <option value="Business & Corporate Law">Business & Corporate Law</option>
        <option value="Real Estate Law">Real Estate Law</option>
        <option value="Immigration & Visa Services">Immigration & Visa Services</option>
        <option value="Civil & Commercial Litigation">Civil & Commercial Litigation</option>
        <option value="Family Law">Family Law</option>
        <option value="Criminal Law">Criminal Law</option>
        <option value="Employment & Labor Law">Employment & Labor Law</option>
        <option value="Intellectual Property & Trademarks">Intellectual Property & Trademarks</option>
        <option value="Arbitration & ADR">Arbitration & Alternative Dispute Resolution (ADR)</option>
        <option value="Banking & Finance Law">Banking & Finance Law</option>
        <option value="Debt Collection">Debt Collection</option>
        <option value="Others">Others (Please specify)</option>
      </select>
      <input name="servicesProvided" placeholder="Services Provided" onChange={handleChange} />

      <h2>Lawyer & Team Details</h2>
      <input name="numberOfLawyers" placeholder="Number of Lawyers in the Firm" onChange={handleChange} />
      {formData.keyPartners.map((partner, index) => (
        <div key={index}>
          <input
            name={`keyPartners[${index}].name`}
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            name={`keyPartners[${index}].specialization`}
            placeholder="Specialization"
            onChange={handleChange}
          />
        </div>
      ))}

      <h2>Language Proficiency</h2>
      <select name="languagesSpoken" multiple onChange={handleChange}>
        <option value="English">English</option>
        <option value="Arabic">Arabic</option>
        <option value="Farsi">Farsi</option>
        <option value="Hindi">Hindi</option>
        <option value="French">French</option>
        <option value="Others">Others (Please specify)</option>
      </select>

      <h2>Case Handling & Collaboration Preferences</h2>
      <select name="initialConsultation" onChange={handleChange}>
        <option value="Free Initial Consultation">Yes, Free Initial Consultation</option>
        <option value="Paid Initial Consultation">Yes, Paid Initial Consultation</option>
        <option value="No Consultation">No, I can assess based on case details</option>
      </select>
      <select name="collaboration" onChange={handleChange}>
        <option value="Yes, frequently">Yes, frequently</option>
        <option value="Sometimes">Sometimes, depending on the case</option>
        <option value="No">No, I only work within my firm</option>
      </select>
      <select name="preferredClientType" onChange={handleChange}>
        <option value="Individuals">Individuals</option>
        <option value="Startups & Small Businesses">Startups & Small Businesses</option>
        <option value="Medium & Large Enterprises">Medium & Large Enterprises</option>
        <option value="Government & Public Sector">Government & Public Sector</option>
        <option value="No Preference">No Preference</option>
      </select>
      <select name="emiratesServed" multiple onChange={handleChange}>
        <option value="Abu Dhabi">Abu Dhabi</option>
        <option value="Dubai">Dubai</option>
        <option value="Sharjah">Sharjah</option>
        <option value="Ajman">Ajman</option>
        <option value="Umm Al-Quwain">Umm Al-Quwain</option>
        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
        <option value="Fujairah">Fujairah</option>
      </select>

      <h2>Technology & Case Management</h2>
      <input type="checkbox" name="caseManagementSoftware" value="Yes" onChange={handleChange} /> Yes
      <input type="checkbox" name="caseManagementSoftware" value="No" onChange={handleChange} /> No
      <select name="communicationTools" multiple onChange={handleChange}>
        <option value="Email">Email</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Microsoft Teams">Microsoft Teams</option>
        <option value="Zoom">Zoom</option>
        <option value="Others">Others (Please specify)</option>
      </select>

      <h2>Additional Permissions</h2>
      <input type="checkbox" name="logoPermission" value="Yes" onChange={handleChange} /> Yes
      <input type="checkbox" name="logoPermission" value="No" onChange={handleChange} /> No
      <input type="checkbox" name="updatesPermission" value="Yes" onChange={handleChange} /> Yes
      <input type="checkbox" name="updatesPermission" value="No" onChange={handleChange} /> No

      <button type="submit">Submit</button>
    </form>
  );
};

export default FirmRegistrationForm;
