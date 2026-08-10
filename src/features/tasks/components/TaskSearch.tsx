interface TaskSearchProps {
  search: string;
  setSearch: (value: string) => void;
}
export function TaskSearch({ search, setSearch }: TaskSearchProps) {
  return (
    <section>
      <div className="container-wrapper">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search tasks by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
      </div>
    </section>
  );
}
