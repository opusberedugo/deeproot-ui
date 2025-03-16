export default function Form({ onSubmit, children }) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <form
        onSubmit={onSubmit}
        className="space-y-6 mx-auto bg-white p-8 w-96 rounded-md shadow-lg"
      >
        {children}
      </form>
    </div>
  );
}