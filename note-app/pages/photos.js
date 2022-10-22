import HeadInfo from "../components/HeadInfo";

function photos() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <HeadInfo title="Photos" />
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              The useEffect() Hook in React is used to instruct our React
              components that they need to do something after rendering, and in
              this scenario, we’d use it to import the bundled Bootstrap
              JavaScript file.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default photos;
