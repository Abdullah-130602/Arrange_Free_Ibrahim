import React, { useState } from "react";
// import "./index.css";

function TermsAndConditions() {
  const [Data, setData] = useState([
    {
      title: "Free Fast Delivery.",
      showMore: 0,
      items: [
        {
          title: "Eligibility",
          desc: [
            "Free fast delivery is available to customers who meet the eligibility criteria set by Arrange Free.",
            "Eligibility may vary based on location, product type, and other factors determined by Arrange Free.",
          ],
        },
        {
          title: "Delivery Speed",
          desc: [
            '"Fast delivery" refers to a delivery time frame set by Arrange Free, which may vary depending on the product or service.',
            "Delivery speed estimates are provided at the time of purchase and are subject to change based on factors such as product availability and location.",
          ],
        },
        {
          title: "Product Availability",
          desc: [
            "Free fast delivery is subject to product availability. Some products may not be eligible for fast delivery due to stock limitations or other factors.",
          ],
        },
        {
          title: "Delivery Area",
          desc: [
            "Free fast delivery is available within designated delivery areas as determined by Arrange Free.",
            "Deliveries outside these areas may be subject to additional charges or longer delivery times.",
          ],
        },
        {
          title: "Scheduling and Confirmation",
          desc: [
            "Customers must provide accurate delivery information, including the delivery address and contact details.",
            "Arrange Free will confirm the delivery date and time with the customer through a confirmation process.",
          ],
        },
        {
          title: "Delivery Timeframe",
          desc: [
            "The delivery timeframe is an estimate and is not guaranteed.",
            "Delays may occur due to unforeseen circumstances, such as weather conditions, traffic, or other logistical challenges.",
          ],
        },
        {
          title: "Delivery Inspection",
          desc: [
            "Customers are responsible for inspecting delivered products upon receipt.",
            "Any visible damage or discrepancies should be noted on the delivery receipt or reported to Arrange Free immediately.",
          ],
        },
        {
          title: "Change of Delivery Details",
          desc: [
            "Customers must inform Arrange Free of any changes to the delivery address or contact information as soon as possible.",
            "Changes may affect the delivery schedule.",
          ],
        },
        {
          title: "Re-Delivery and Charges",
          desc: [
            "If a delivery attempt is unsuccessful due to customer unavailability or inaccurate information, a re-delivery may be arranged.",
            "Re-delivery charges, if applicable, will be borne by the customer.",
          ],
        },
        {
          title: "Returns and Refunds",
          desc: [
            "If a customer wishes to return a product, they should refer to the Arrange Free Returns and Refunds policy for specific instructions.",
            "Delivery charges, if any, may not be refundable.",
          ],
        },
        {
          title: "Force Majeure",
          desc: [
            "Arrange Free is not liable for delays or failures in delivery caused by events beyond its control, such as natural disasters, strikes, or other force majeure events.",
          ],
        },
        {
          title: "Customer Support",
          desc: [
            "Customers with questions or concerns regarding their delivery should contact Arrange Free's customer support for assistance.",
          ],
        },
      ],
    },
    {
      title: "Customize Services",
      showMore: 0,
      items: [
        {
          title: "Service Description",
          desc: [
            "Customize services provided by Arrange Free include personalization and customization of furniture, interior elements, or other products as specified by the customer.",
          ],
        },
        {
          title: "Design Consultation",
          desc: [
            "Customers are encouraged to schedule a design consultation with Arrange Free's experts to discuss their customization requirements, preferences, and design concepts.",
          ],
        },
        {
          title: "Design Approval",
          desc: [
            "A detailed design proposal, including specifications, sketches, or samples, will be provided for customer approval before customization work begins.",
            "Customers must review and approve the design in writing or electronically.",
          ],
        },
        {
          title: "Customization Process",
          desc: [
            "The customization process may involve alterations to size, color, material, or design based on customer preferences.",
            "Customization work will commence only after written approval and confirmation of the design proposal.",
          ],
        },
        {
          title: "Payment",
          desc: [
            "Payment terms for customization services will be specified in the contract or invoice provided by Arrange Free.",
            "Payments are typically structured to include a deposit or upfront payment before customization work begins.",
          ],
        },
        {
          title: "Completion Timeline",
          desc: [
            "A timeframe for completing the customization work will be provided to the customer.",
            "The timeline may vary depending on the complexity of the customization and availability of materials.",
          ],
        },
        {
          title: "Changes and Revisions",
          desc: [
            "Customers should communicate any changes or revisions to the approved design promptly.",
            "Additional charges or delays may apply for significant changes made after the customization work has started.",
          ],
        },
        {
          title: "Quality Assurance",
          desc: [
            "Arrange Free is committed to delivering high-quality customized products and services.",
            "Customers are encouraged to inspect and approve the final customized product before acceptance.",
          ],
        },
        {
          title: "Cancellation",
          desc: [
            "Cancellation policies for customization services will be outlined in the contract or agreement.",
            "Cancellation fees may apply if customization work has already begun.",
          ],
        },
        {
          title: "Returns and Refunds",
          desc: [
            "Returns and refunds for customized products are subject to the Arrange Free Returns and Refunds policy, which may have specific conditions for custom items.",
          ],
        },
        {
          title: "Liability",
          desc: [
            "Arrange Free is not liable for design choices, preferences, or errors made by the customer during the customization process.",
            "The customer is responsible for ensuring that the approved design meets their requirements.",
          ],
        },
        {
          title: "Disputes",
          desc: [
            "Disputes or concerns related to customization services should be addressed through the dispute resolution process outlined in the contract or agreement.",
          ],
        },
        {
          title: "Intellectual Property",
          desc: [
            "Any design concepts, drawings, or intellectual property developed during the customization process may be subject to intellectual property rights as specified in the contract.",
          ],
        },
        {
          title: "Customer Satisfaction",
          desc: [
            "Arrange Free is dedicated to customer satisfaction and will make reasonable efforts to address any issues or concerns related to customization services.",
          ],
        },
      ],
    },
    {
      title: "50% Credit on All Products and Services",
      showMore: 0,
      items: [
        {
          title: "Eligibility",
          desc: [
            "The 50% credit offer is available to eligible customers who meet the criteria set by Arrange Free.",
            "Eligibility requirements may include credit checks, age restrictions, and other factors determined by Arrange Free.",
          ],
        },
        {
          title: "Credit Amount",
          desc: [
            "Customers are eligible to receive a 50% credit on the total cost of products and services offered by Arrange Free.",
            "The credit amount is applied to the customer's account and can be used for future purchases.",
          ],
        },
        {
          title: "Payment Schedule",
          desc: [
            "Customers must pay 50% of the total cost upfront for products and services.",
            "The remaining 50% will be credited to the customer's account for future use.",
            "The credit may be used for multiple transactions until fully utilized.",
          ],
        },
        {
          title: "Flexible Payment Terms",
          desc: [
            "Customers have the flexibility to choose their preferred payment method for the initial 50% payment.",
            "Payment options may include credit cards, debit cards, electronic funds transfer, or other approved methods.",
          ],
        },
        {
          title: "Expiration of Credit",
          desc: [
            "The credit amount is typically valid for a specified period from the date of issuance, as determined by Arrange Free.",
            "Customers should check the expiration date to ensure timely use.",
          ],
        },
        {
          title: "Use of Credit",
          desc: [
            "Credit can be applied toward the purchase of products and services offered by Arrange Free, subject to availability and product/service eligibility.",
          ],
        },
        {
          title: "Non-Transferable",
          desc: [
            "The credit is non-transferable and can only be used by the original recipient/customer.",
            "It cannot be exchanged for cash or transferred to another person or account.",
          ],
        },
        {
          title: "Credit Limitations",
          desc: [
            "Credit may have limitations on its use, such as restrictions on certain products or services.",
            "Customers should review the terms and conditions associated with each credit offer.",
          ],
        },
        {
          title: "Account Management",
          desc: [
            "Customers are responsible for managing their account and tracking credit usage.",
            "Any discrepancies or concerns related to the credit should be reported to Arrange Free's customer support.",
          ],
        },
        {
          title: "Refunds and Returns",
          desc: [
            "In the event of returns or refunds for products or services, credit used for the original purchase may be refunded in accordance with Arrange Free's Returns and Refunds policy.",
          ],
        },
        {
          title: "Modification and Termination",
          desc: [
            "Arrange Free reserves the right to modify or terminate the 50% credit offer at any time, with or without notice.",
            "Customers will be informed of any changes to the offer's terms and conditions.",
          ],
        },
        {
          title: "Compliance",
          desc: [
            "Customers are expected to comply with all terms and conditions associated with the use of the 50% credit offer.",
            "Violation of these terms may result in the revocation of credit privileges.",
          ],
        },
      ],
    },
    {
      title: "Late Payment Fees and Auto Payment System",
      showMore: 0,
      items: [
        {
          title: "Late Payment Fees",
          desc: [
            "In the event of a late payment, a late payment fee may be applied to the outstanding balance in accordance with the terms specified in the credit agreement.",
            "Customers are responsible for paying any late payment fees incurred due to missed or delayed payments.",
          ],
        },
        {
          title: "Auto Payment Authorization",
          desc: [
            "Customers may have the option to set up an auto payment system by linking their bank account to their credit account with Arrange Free.",
            "By authorizing auto payments, customers agree to have their monthly payments automatically withdrawn from their designated bank account on the due date.",
          ],
        },
        {
          title: "Auto Payment Enrollment",
          desc: [
            "Customers who wish to enroll in the auto payment system must provide the necessary authorization and banking information to Arrange Free.",
            "Auto payment enrollment is subject to approval by Arrange Free and the customer's bank.",
          ],
        },
        {
          title: "Payment Due Date",
          desc: [
            "The auto payment system will initiate payments on the specified due date for the minimum required payment or the full outstanding balance, as selected by the customer.",
          ],
        },
        {
          title: "Payment Confirmation",
          desc: [
            "Customers will receive confirmation of each auto payment, typically in the form of an electronic receipt or statement.",
            "It is the customer's responsibility to review payment confirmations for accuracy.",
          ],
        },
        {
          title: "Auto Payment Changes",
          desc: [
            "Customers have the option to modify or cancel their auto payment enrollment by providing written notice to Arrange Free.",
            "Changes may take effect with a reasonable processing time and may not affect payments already scheduled.",
          ],
        },
        {
          title: "Insufficient Funds",
          desc: [
            "Customers are responsible for ensuring that their bank account linked to the auto payment system has sufficient funds to cover the scheduled payments.",
            "Insufficient funds may result in failed payments, additional fees, and potential consequences as outlined in the credit agreement.",
          ],
        },
        {
          title: "Payment Disputes",
          desc: [
            "Disputes related to auto payments should be reported promptly to Arrange Free's customer support for resolution.",
            "Customers should also contact their bank to address any unauthorized or erroneous transactions.",
          ],
        },
        {
          title: "Termination of Auto Payment",
          desc: [
            "Arrange Free reserves the right to terminate the auto payment system for a customer at its discretion, especially in cases of repeated payment failures or non-compliance with the credit terms.",
          ],
        },
        {
          title: "Bank-to-Bank Security",
          desc: [
            "The bank-to-bank auto payment system is subject to the security measures and protocols implemented by both the customer's bank and Arrange Free to protect sensitive financial information.",
          ],
        },
      ],
    },
    {
      title: "RBI Compliance",
      showMore: 0,
      items: [
        {
          title: "Regulatory Compliance",
          desc: [
            "Customers acknowledge that Arrange Free operates in accordance with the regulations and guidelines issued by the Reserve Bank of India (RBI) and other relevant authorities.",
            "Customers are expected to comply with all RBI regulations and guidelines applicable to financial transactions, credit, and payments.",
          ],
        },
        {
          title: "Foreign Exchange Transactions",
          desc: [
            "For international transactions, customers should adhere to RBI guidelines concerning foreign exchange, including Know Your Customer (KYC) and Anti-Money Laundering (AML) requirements.",
            "Any applicable foreign exchange conversion rates will be in accordance with RBI guidelines.",
          ],
        },
        {
          title: "Credit Limits and Reporting",
          desc: [
            "Customers are responsible for adhering to RBI-mandated credit limits, if applicable.",
            "Arrange Free may report credit transactions and customer information to the Credit Information Companies (CICs) and RBI as required by law and RBI guidelines.",
          ],
        },
        {
          title: "Data Security and Privacy",
          desc: [
            "Customer data security and privacy are of utmost importance. Arrange Free will comply with RBI's data protection and privacy regulations.",
            "Customers are responsible for safeguarding their financial and personal information and should report any security breaches promptly.",
          ],
        },
        {
          title: "Nodal Account and Settlements",
          desc: [
            "In accordance with RBI regulations, Arrange Free may maintain a nodal bank account for settlements and transactions.",
            "Customers acknowledge and agree to the use of a nodal account for transaction processing and settlements.",
          ],
        },
        {
          title: "Dispute Resolution",
          desc: [
            "Disputes related to RBI compliance or financial transactions will be resolved in accordance with RBI guidelines and applicable Indian laws.",
            "Customers may seek dispute resolution assistance through RBI's designated channels.",
          ],
        },
        {
          title: "Updates and Amendments",
          desc: [
            "Arrange Free reserves the right to update these terms and conditions to align with changes in RBI regulations.",
            "Customers will be notified of any amendments to these terms through appropriate channels.",
          ],
        },
        {
          title: "Reporting Requirements",
          desc: [
            "Customers may be required to provide additional documentation or information to comply with RBI reporting requirements, including the reporting of high-value transactions.",
          ],
        },
        {
          title: "Withdrawal of Services",
          desc: [
            "In the event that Arrange Free is unable to comply with RBI regulations or guidelines, it reserves the right to withdraw or modify its services to ensure compliance.",
          ],
        },
        {
          title: "Customer Responsibility",
          desc: [
            "Customers are responsible for staying informed about RBI regulations and guidelines that may affect their financial transactions and credit activities.",
            "Failure to comply with RBI regulations may result in legal consequences and penalties.",
          ],
        },
      ],
    },
    {
      title: "Home Visit Services Provided Free of Charge",
      showMore: 0,
      items: [
        {
          title: "Service Description",
          desc: [
            "Arrange Free offers complimentary home visit services, allowing customers to schedule visits by experts or professionals for consultations, measurements, or other relevant services related to our offerings.",
          ],
        },
        {
          title: "Eligibility",
          desc: [
            "Home visit services provided free of charge are available to all customers who wish to utilize them, subject to availability and service areas.",
          ],
        },
        {
          title: "Scheduling",
          desc: [
            "Customers can request home visits through Arrange Free's website, app, or customer support.",
            "Visits should be scheduled at a time that is mutually convenient for the customer and Arrange Free's representatives.",
          ],
        },
        {
          title: "Service Scope",
          desc: [
            "Home visits may include consultations, measurements, design discussions, product evaluations, or other services related to Arrange Free's offerings.",
            "The scope of each visit will be discussed and agreed upon between the customer and Arrange Free's representatives.",
          ],
        },
        {
          title: "No Hidden Charges",
          desc: [
            "Home visit services provided free of charge do not carry any hidden charges or fees.",
            "Customers will not be required to pay for the visit itself, and there are no service fees associated with this offering.",
          ],
        },
        {
          title: "Cancellation or Rescheduling",
          desc: [
            "Customers who need to cancel or reschedule a home visit should provide adequate notice to Arrange Free's customer support.",
            "Late cancellations or rescheduling requests may impact future appointment availability.",
          ],
        },
        {
          title: "Accuracy of Information",
          desc: [
            "Customers are responsible for providing accurate and complete information when scheduling home visits to ensure the efficient delivery of services.",
          ],
        },
        {
          title: "Service Limitations",
          desc: [
            "Home visit services provided free of charge are subject to availability and service areas determined by Arrange Free.",
            "Certain remote or inaccessible locations may not be eligible for this service.",
          ],
        },
        {
          title: "Professional Conduct",
          desc: [
            "Arrange Free's representatives will conduct themselves professionally during home visits and adhere to ethical and respectful conduct.",
          ],
        },
        {
          title: "Use of Information",
          desc: [
            "Information gathered during home visits, such as measurements and design preferences, will be used solely for the purpose of providing the requested services and will be handled in accordance with Arrange Free's privacy policy.",
          ],
        },
        {
          title: "Feedback and Evaluation",
          desc: [
            "Customers are encouraged to provide feedback on their home visit experience to help improve the quality of service provided by Arrange Free.",
          ],
        },
        {
          title: "Termination or Modification",
          desc: [
            "Arrange Free reserves the right to modify or terminate the home visit service provided free of charge at its discretion, with or without notice.",
          ],
        },
      ],
    },
    {
      title: "VIP Access Provided",
      showMore: 0,
      items: [
        {
          title: "VIP Access Description",
          desc: [
            "VIP access is a special privilege provided by Arrange Free to select customers, offering enhanced benefits, priority service, and exclusive offers.",
          ],
        },
        {
          title: "Eligibility",
          desc: [
            "VIP access is granted at the discretion of Arrange Free to customers who meet specific criteria, which may include factors such as loyalty, engagement, or spending thresholds.",
          ],
        },
        {
          title: "Benefits",
          desc: [
            "Priority Service: VIP customers receive expedited service and faster response times.",
            "Exclusive Offers: VIP customers have access to special promotions, discounts, and offers not available to regular customers.",
            "Dedicated Support: VIP customers receive personalized assistance from a dedicated support team.",
            "Early Access: VIP customers are among the first to know about new products, collections, and services.",
            "Customized Solutions: VIP customers receive tailored recommendations and solutions based on their preferences and needs.",
          ],
        },
        {
          title: "Duration",
          desc: [
            "VIP access is typically granted for a specified duration, which may be subject to renewal based on continued eligibility.",
          ],
        },
        {
          title: "Usage",
          desc: [
            "VIP access benefits are exclusively for the use of the VIP customer and may not be transferred to others.",
          ],
        },
        {
          title: "Termination or Modification",
          desc: [
            "Arrange Free reserves the right to modify or terminate VIP access at its discretion, with or without notice.",
            "Termination may occur if the VIP customer no longer meets the eligibility criteria or for reasons deemed appropriate by Arrange Free.",
          ],
        },
        {
          title: "Customer Responsibility",
          desc: [
            "VIP customers are responsible for adhering to the terms and conditions associated with VIP access and complying with all applicable laws and regulations.",
          ],
        },
        {
          title: "Communication",
          desc: [
            "VIP customers may receive communications and updates related to their VIP status, benefits, and exclusive offers through their preferred communication channels.",
          ],
        },
        {
          title: "Privacy and Data Usage",
          desc: [
            "VIP customer information and data will be handled in accordance with Arrange Free's privacy policy.",
            "Customer data will not be shared with third parties without consent, except as required by law.",
          ],
        },
        {
          title: "Governing Law",
          desc: [
            "These terms and conditions are governed by the laws of the jurisdiction in which Arrange Free operates.",
          ],
        },
        {
          title: "Dispute Resolution",
          desc: [
            "Disputes related to VIP access or benefits will be resolved in accordance with Arrange Free's internal dispute resolution procedures.",
          ],
        },
        {
          title: "Feedback and Suggestions",
          desc: [
            "VIP customers are encouraged to provide feedback and suggestions to help improve the quality of VIP access and services.",
          ],
        },
      ],
    },
    {
      title: "Delivery and Assembly Services Provided Free of Charge",
      showMore: 0,
      items: [
        {
          title: "Service Description",
          desc: [
            "Arrange Free offers complimentary delivery and assembly services, allowing customers to receive and assemble products without incurring additional fees.",
          ],
        },
        {
          title: "Eligibility",
          desc: [
            "Delivery and assembly services provided free of charge are available to all customers who make qualifying purchases, subject to eligibility criteria and service areas.",
          ],
        },
        {
          title: "Qualifying Purchases",
          desc: [
            "Customers must meet the minimum purchase or order requirement specified by Arrange Free to be eligible for free delivery and assembly services.",
          ],
        },
        {
          title: "Service Scope",
          desc: [
            "Free delivery and assembly services cover the following:",
            "- Delivery of products to the customer's specified location.",
            "- Assembly of products, including furniture, home goods, or other items, as required.",
            "- Basic placement of assembled items in the desired room or area.",
          ],
        },
        {
          title: "Scheduling",
          desc: [
            "Customers can schedule delivery and assembly services through Arrange Free's website, app, or customer support.",
            "Delivery and assembly appointments should be scheduled at a time that is mutually convenient for the customer and Arrange Free's representatives.",
          ],
        },
        {
          title: "No Hidden Charges",
          desc: [
            "Delivery and assembly services provided free of charge do not carry any hidden charges or fees.",
            "Customers will not be required to pay for the service itself.",
          ],
        },
        {
          title: "Cancellation or Rescheduling",
          desc: [
            "Customers who need to cancel or reschedule a delivery and assembly appointment should provide adequate notice to Arrange Free's customer support.",
            "Late cancellations or rescheduling requests may impact appointment availability.",
          ],
        },
        {
          title: "Accuracy of Information",
          desc: [
            "Customers are responsible for providing accurate and complete delivery information to ensure the efficient delivery and assembly of products.",
          ],
        },
        {
          title: "Service Limitations",
          desc: [
            "Free delivery and assembly services are subject to availability and service areas determined by Arrange Free.",
            "Certain remote or inaccessible locations may not be eligible for this service.",
          ],
        },
        {
          title: "Product Inspection",
          desc: [
            "Customers should inspect delivered products upon receipt and before assembly to identify any visible damage or discrepancies.",
            "Any issues should be reported to Arrange Free's customer support.",
          ],
        },
        {
          title: "Liability",
          desc: [
            "Arrange Free is responsible for delivering and assembling products in accordance with industry standards.",
            "Customers are responsible for ensuring that assembled products meet their expectations and are suitable for their intended use.",
          ],
        },
        {
          title: "Modification or Termination",
          desc: [
            "Arrange Free reserves the right to modify or terminate the free delivery and assembly service at its discretion, with or without notice.",
          ],
        },
      ],
    },
    {
      title:
        "Deep Cleaning Services Provided Three Times Annually to Eligible Customers",
      showMore: 0,
      items: [
        {
          title: "Service Description",
          desc: [
            "Arrange Free offers deep cleaning services to eligible customers up to three times a year. Deep cleaning includes a thorough cleaning of the customer's premises, such as homes, offices, or other designated areas.",
          ],
        },
        {
          title: "Eligibility",
          desc: [
            "Eligibility for deep cleaning services is determined by Arrange Free based on criteria such as customer loyalty, engagement, or participation in specific promotions.",
            "Customers must meet the eligibility criteria specified by Arrange Free to qualify for this service.",
          ],
        },
        {
          title: "Service Frequency",
          desc: [
            "Eligible customers are entitled to receive deep cleaning services up to three times annually.",
            "The service frequency is reset at the beginning of each calendar year.",
          ],
        },
        {
          title: "Scheduling",
          desc: [
            "Eligible customers can schedule deep cleaning services through Arrange Free's website, app, or customer support.",
            "Service appointments should be scheduled at a mutually convenient time for the customer and Arrange Free's cleaning team.",
          ],
        },
        {
          title: "Service Scope",
          desc: [
            "Deep cleaning services encompass comprehensive cleaning tasks, including but not limited to dusting, vacuuming, mopping, sanitizing, and other deep cleaning activities.",
            "Customers may specify the areas or rooms they wish to have cleaned during each service.",
          ],
        },
        {
          title: "No Hidden Charges",
          desc: [
            "Deep cleaning services provided to eligible customers do not involve hidden charges or fees.",
            "Customers will not be required to pay for the service itself.",
          ],
        },
        {
          title: "Cancellation or Rescheduling",
          desc: [
            "Eligible customers who need to cancel or reschedule a deep cleaning appointment should provide adequate notice to Arrange Free's customer support.",
            "Late cancellations or rescheduling requests may impact the availability of future appointments.",
          ],
        },
        {
          title: "Service Limitations",
          desc: [
            "Deep cleaning services are subject to availability and service areas determined by Arrange Free.",
            "Certain locations may not be eligible for this service due to logistical constraints.",
          ],
        },
        {
          title: "Product and Equipment",
          desc: [
            "Arrange Free's cleaning team will provide the necessary cleaning products and equipment for deep cleaning services.",
            "Customers are responsible for ensuring a safe and accessible cleaning environment.",
          ],
        },
        {
          title: "Liability",
          desc: [
            "Arrange Free is responsible for delivering deep cleaning services in accordance with industry standards.",
            "Customers are responsible for securing their belongings and valuable items during the cleaning process.",
          ],
        },
        {
          title: "Modification or Termination",
          desc: [
            "Arrange Free reserves the right to modify or terminate the provision of deep cleaning services at its discretion, with or without notice.",
          ],
        },
      ],
    },
    {
      title: "Curtain Cleaning Services Provided Twice Annually",
      showMore: 0,
      items: [
        {
          title: "Service Description",
          desc: [
            "Arrange Free offers curtain cleaning services to eligible customers twice a year. Curtain cleaning includes the cleaning and maintenance of curtains, drapes, or window coverings.",
          ],
        },
        {
          title: "Eligibility",
          desc: [
            "Eligibility for curtain cleaning services is determined by Arrange Free based on criteria such as customer loyalty, engagement, or participation in specific promotions.",
            "Customers must meet the eligibility criteria specified by Arrange Free to qualify for this service.",
          ],
        },
        {
          title: "Service Frequency",
          desc: [
            "Eligible customers are entitled to receive curtain cleaning services twice annually.",
            "The service frequency is reset at the beginning of each calendar year.",
          ],
        },
        {
          title: "Scheduling",
          desc: [
            "Eligible customers can schedule curtain cleaning services through Arrange Free's website, app, or customer support.",
            "Service appointments should be scheduled at a mutually convenient time for the customer and Arrange Free's cleaning team.",
          ],
        },
        {
          title: "Service Scope",
          desc: [
            "Curtain cleaning services encompass the removal, cleaning, and reinstallation of curtains or drapes.",
            "Customers may specify the number and type of curtains they wish to have cleaned during each service.",
          ],
        },
        {
          title: "No Hidden Charges",
          desc: [
            "Curtain cleaning services provided to eligible customers do not involve hidden charges or fees.",
            "Customers will not be required to pay for the service itself.",
          ],
        },
        {
          title: "Cancellation or Rescheduling",
          desc: [
            "Eligible customers who need to cancel or reschedule a curtain cleaning appointment should provide adequate notice to Arrange Free's customer support.",
            "Late cancellations or rescheduling requests may impact the availability of future appointments.",
          ],
        },
        {
          title: "Service Limitations",
          desc: [
            "Curtain cleaning services are subject to availability and service areas determined by Arrange Free.",
            "Certain locations may not be eligible for this service due to logistical constraints.",
          ],
        },
        {
          title: "Curtain Care and Maintenance",
          desc: [
            "Customers are responsible for proper care and maintenance of curtains between cleaning appointments.",
            "Arrange Free is not liable for damage or deterioration resulting from neglect or improper handling.",
          ],
        },
        {
          title: "Liability",
          desc: [
            "Arrange Free is responsible for delivering curtain cleaning services in accordance with industry standards.",
            "Customers are responsible for securing their belongings and valuable items during the cleaning process.",
          ],
        },
        {
          title: "Modification or Termination",
          desc: [
            "Arrange Free reserves the right to modify or terminate the provision of curtain cleaning services at its discretion, with or without notice.",
          ],
        },
      ],
    },
    {
      title:
        "Yearly Interior Design Services for One Home (Design Only - No Execution)",
      showMore: 0,
      items: [
        {
          title: "Service Description",
          desc: [
            "Arrange Free offers interior design services to eligible customers for one home annually. This service involves the creation of design concepts, layouts, and recommendations for the enhancement of the customer's living space. Please note that this service covers design only and does not include execution or implementation tasks on the site.",
          ],
        },
        {
          title: "Eligibility",
          desc: [
            "Eligibility for interior design services is determined by Arrange Free based on criteria such as customer loyalty, engagement, or participation in specific promotions. Customers must meet the eligibility criteria specified by Arrange Free to qualify for this service.",
          ],
        },
        {
          title: "Service Frequency",
          desc: [
            "Eligible customers are entitled to receive interior design services for one home once annually. The service frequency is reset at the beginning of each calendar year.",
          ],
        },
        {
          title: "Scheduling",
          desc: [
            "Eligible customers can schedule interior design services through Arrange Free's website, app, or customer support. Service appointments should be scheduled at a mutually convenient time for the customer and Arrange Free's interior designers.",
          ],
        },
        {
          title: "Service Scope",
          desc: [
            "Interior design services encompass design consultations, space planning, color and material selection, furniture layout, and other aspects of interior design. Customers may specify the rooms or areas within the home they wish to have designed during each service.",
          ],
        },
        {
          title: "No Hidden Charges",
          desc: [
            "Interior design services provided to eligible customers do not involve hidden charges or fees. Customers will not be required to pay for the design service itself.",
          ],
        },
        {
          title: "Cancellation or Rescheduling",
          desc: [
            "Eligible customers who need to cancel or reschedule an interior design appointment should provide adequate notice to Arrange Free's customer support. Late cancellations or rescheduling requests may impact the availability of future appointments.",
          ],
        },
        {
          title: "Service Limitations",
          desc: [
            "Interior design services are subject to availability and service areas determined by Arrange Free. Certain locations may not be eligible for this service due to logistical constraints.",
          ],
        },
        {
          title: "Design Ownership",
          desc: [
            "The interior design concepts and recommendations provided by Arrange Free are the intellectual property of Arrange Free. Customers may use the design concepts for personal use but are not allowed to replicate, sell, or distribute the designs without written consent from Arrange Free.",
          ],
        },
        {
          title: "Design Implementation",
          desc: [
            "The implementation of the design recommendations, including the purchase of furnishings and materials, is the sole responsibility of the customer. Arrange Free does not provide furnishings or materials, nor does it handle execution tasks on-site.",
          ],
        },
        {
          title: "Liability",
          desc: [
            "Arrange Free is responsible for delivering interior design services in accordance with industry standards. Customers are responsible for implementing the design recommendations and for any costs associated with such implementation.",
          ],
        },
        {
          title: "Modification or Termination",
          desc: [
            "Arrange Free reserves the right to modify or terminate the provision of interior design services at its discretion, with or without notice.",
          ],
        },
      ],
    },
    {
      title: "In-House Dedicated Execution Team",
      showMore: 0,
      items: [
        {
          title: "Service Description",
          desc: [
            "Arrange Free offers an In-House Dedicated Execution Team service to customers seeking professional execution and implementation of interior design projects. This service involves the coordination, management, and execution of design recommendations provided by Arrange Free's interior designers. Please note that this service is not free, and customers will be responsible for the associated costs.",
          ],
        },
        {
          title: "Eligibility",
          desc: [
            "Customers who have availed of Arrange Free's interior design services and wish to proceed with the execution phase are eligible to engage the In-House Dedicated Execution Team.",
            "Eligibility may also be subject to project-specific requirements and approvals.",
          ],
        },
        {
          title: "Scope of Execution",
          desc: [
            "The In-House Dedicated Execution Team is responsible for executing the design recommendations, including but not limited to construction, installation, procurement of materials, and project management.",
            "The specific scope of execution will be detailed in a separate project agreement between Arrange Free and the customer.",
          ],
        },
        {
          title: "Project Agreement",
          desc: [
            "Prior to the commencement of execution work, a comprehensive project agreement will be provided to the customer. This agreement will outline project milestones, timelines, costs, responsibilities, and any other pertinent details.",
            "Both parties must thoroughly review, approve, and sign the project agreement to proceed with the execution.",
          ],
        },
        {
          title: "Execution Costs",
          desc: [
            "Customers engaging the In-House Dedicated Execution Team are responsible for all costs associated with the execution of the project. These costs may include labor, materials, permits, and any additional expenses specified in the project agreement.",
            "A clear payment schedule and method will be stipulated in the project agreement.",
          ],
        },
        {
          title: "Quality Assurance",
          desc: [
            "Arrange Free's In-House Dedicated Execution Team is committed to delivering high-quality results. We maintain rigorous quality control standards to ensure that the executed work aligns with the design recommendations and meets industry standards.",
          ],
        },
        {
          title: "Project Changes",
          desc: [
            "Any changes or modifications to the project scope, design, or materials must be documented in writing and approved by both parties.",
            "Changes may impact project timelines and costs, and these adjustments will be reflected in the project agreement.",
          ],
        },
        {
          title: "Project Timeline",
          desc: [
            "The project timeline, including start and completion dates, will be established within the project agreement.",
            "Delays caused by factors beyond Arrange Free's control will be communicated to the customer in a timely manner.",
          ],
        },
        {
          title: "Project Completion",
          desc: [
            "The project is considered complete when all work outlined in the project agreement is finished, and both parties have conducted a final walkthrough and accepted the results.",
          ],
        },
        {
          title: "Liability",
          desc: [
            "Arrange Free's In-House Dedicated Execution Team is responsible for executing the project professionally and in accordance with industry standards.",
            "Customers are responsible for any damages or issues that may arise due to alterations or changes made to the project after completion.",
          ],
        },
        {
          title: "Termination",
          desc: [
            "Either party has the right to terminate the execution agreement as per the termination clauses specified in the project agreement.",
          ],
        },
        {
          title: "Dispute Resolution",
          desc: [
            "Disputes related to the execution of the project will be resolved following the dispute resolution procedures outlined in the project agreement.",
          ],
        },
        {
          title: "Governing Law",
          desc: [
            "The execution agreement is governed by the laws of the jurisdiction in which the project is located.",
          ],
        },
      ],
    },
  ]);

  const HandleChange = (e, id) => {
    const value = [...Data];
    value[id].showMore = e;
    setData(value);
  };

  return (
    <div className="bg-[#242836] pb-10 h-max w-full">
      <div className="py-5">
        <h1 className="text-white text-center text-3xl font-bold underline">
          Terms & Conditions
        </h1>
      </div>
      <div className="gap-5 mx-5 grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {Data &&
          Data.map((edr, ina) => {
            return (
              <div className="bg-white rounded-xl h-auto px-5 pt-5" key={ina}>
                <p className="text-start text-xl font-semibold">{edr.title}</p>
                <div className="mt-4">
                  {edr.showMore === 1 ? (
                    <p
                      className="text-end font-semibold cursor-pointer"
                      onClick={() => HandleChange(0, ina)}
                    >
                      See Less
                    </p>
                  ) : (
                    ""
                  )}
                  {edr.showMore === 0 ? (
                    <>
                      <div className="bg-slate-200 rounded-lg  w-full p-5 my-1">
                        <p className=" font-semibold">{edr.items[0].title}</p>
                        <ul className="pl-5 text-gray-600 ">
                          {edr.items[0].desc.map((desc, dein) => {
                            return (
                              <li className="list-disc text-start " key={dein}>
                                {desc}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <p
                        className="text-end font-semibold cursor-pointer"
                        onClick={() => HandleChange(1, ina)}
                      >
                        See More
                      </p>
                    </>
                  ) : (
                    edr.items.map((items, ind) => {
                      return (
                        <div
                          className="bg-slate-200 rounded-lg  w-full p-5 my-1"
                          key={ind}
                        >
                          <p className=" font-semibold">{items.title}</p>
                          <ul className="pl-5 text-gray-600 ">
                            {items.desc.map((desc, dein) => {
                              return (
                                <li
                                  className="list-disc text-start "
                                  key={dein}
                                >
                                  {desc}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default TermsAndConditions;
