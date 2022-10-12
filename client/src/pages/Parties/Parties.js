import MultiStepPartyRequestForm from "../../components/Parties/MultiStepPartyRequestForm";
import { useState } from "react";
import PartyRequestForm from "../../components/Parties/PartyRequestForm";
import Modal from "../../components/utils/Modal";

const Parties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="party-request-form-container">
      {isModalOpen && (
        <Modal>
          <h1>
            You have successfully requested to book a party at the Art Station!
            An email has been sent to you with all the details. We will give you
            a call as soon as possible to discuss further
          </h1>
        </Modal>
      )}
      <div>
        <h1 className="title">Party Request</h1>
      </div>
      <PartyRequestForm setIsModalOpen={setIsModalOpen} />
      {/* <MultiStepPartyRequestForm /> */}
    </main>
  );
};

export default Parties;
