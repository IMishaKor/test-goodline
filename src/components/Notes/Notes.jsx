function Notes() {
  return (
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center ">
        Заметка 1
        <div className="text-nowrap">
          <button type="submit" class="btn btn-default btn-sm mx-1">
            &#9998;
          </button>
          <button type="submit" class="btn btn-default btn-sm">
            &#10006;
          </button>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center ">
        Заметка 2
        <div className="text-nowrap">
          <button type="submit" class="btn btn-default btn-sm mx-1">
            &#9998;
          </button>
          <button type="submit" class="btn btn-default btn-sm">
            &#10006;
          </button>
        </div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center ">
        Заметка 3
        <div className="text-nowrap">
          <button type="submit" class="btn btn-default btn-sm mx-1">
            &#9998;
          </button>
          <button type="submit" class="btn btn-default btn-sm">
            &#10006;
          </button>
        </div>
      </li>
    </ul>
  );
}

export default Notes;
