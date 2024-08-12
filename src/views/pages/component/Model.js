import React from "react";

export const Model = ({ setModal, resume }) => {
  return (
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel" onClick={() => setModal(false)}>Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          {resume !== null && (
          <>
            {" "}
            <embed
              type="application/pdf"
              src={resume}
              width={100+ '%'}
              height={100+ '%'}
            />
          </>
        )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    // <div className="backshadow">
    //   <div className="custom-modal">
    //     <div className="delete-icon" onClick={() => setModal(false)}>
    //       x
    //     </div>
    //     {resume !== null && (
    //       <>
    //         {" "}
    //         <embed
    //           type="application/pdf"
    //           src={resume}
    //           width={100 + "%"}
    //           height={100 + "%"}
    //         />
    //       </>
    //     )}
    //   </div>
    // </div>
  );
};
