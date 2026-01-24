function BookHeader({ keyword, setKeyword }) {
  return (
    <div className="book-header mb-4">
      <h2 className="mb-3">📚 Danh sách sách</h2>

      <input
        type="text"
        className="form-control"
        placeholder="🔍 Tìm theo tên sách hoặc tác giả..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}

export default BookHeader;
