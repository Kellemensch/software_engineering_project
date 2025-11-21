import ReceiptImage from "./../assets/DSC09531.jpg";

export default function SalespersonReceiptInfo() {
    return(
      <div className="information-container">
        <div className="information-card">
          <h2>Receipt Information</h2>

          <img src={ReceiptImage} className="information-image" alt="Receipt" />
          <br />
          <b>Title</b><br />
          <b>Subject</b><br />
          <b>Date</b><br />
          <b>Amount</b><br />
          <b>Status</b>

          <button type="submit" className="delete-button"> Delete</button>

        </div>
      </div>
    );
}