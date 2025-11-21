import ReceiptImage from "./../assets/DSC09531.jpg";

export default function AccountantReceiptInfo() {
    return(
        <div className="information-container">
            <div className="information-card">
                <h2>Receipt Information</h2>

                <img src={ReceiptImage} className="information-image" alt="Receipt" />
                <br />
                <b>From: John</b>
                <b>Title</b><br />
                <b>Subject</b><br />
                <b>Date</b><br />
                <b>Amount</b><br />

                <div className="button-container">
                    <button type="submit" className="valid-button">Valid</button>
                    <button type="submit" className="not-valid-button">Not Valid</button>
                </div>                    
            </div>
        </div>
    );
}