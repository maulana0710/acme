function Progress() {
  return (
    <div class="position-relative m-4">
      <div class="progress" style={{ height: "1px" }}>
        <div
          class="progress-bar"
          role="progressbar"
          aria-label="Progress"
          style={{ width: "50%" }}
          aria-valuenow="50"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <button
        type="button"
        className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
        style={{ width: "2rem", height: "2rem" }}
      >
        1
      </button>
      <button
        type="button"
        className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"
        style={{ width: "2rem", height: "2rem" }}
      >
        2
      </button>
      <button
        type="button"
        className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
        style={{ width: "2rem", height: "2rem" }}
      >
        3
      </button>
    </div>
  );
}

export default Progress;
