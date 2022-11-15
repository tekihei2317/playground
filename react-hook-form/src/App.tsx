import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().positive().int(),
  website: z.string().url(),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  return (
    <form
      onSubmit={handleSubmit((d) => console.log(d))}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div>
        <label>First Name</label>
        <input type="text" {...register("firstName")} />
        <p style={{ color: "red" }}>{errors.firstName?.message}</p>
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" {...register("lastName")} />
        <p style={{ color: "red" }}>{errors.lastName?.message}</p>
      </div>
      <div>
        <label>Age</label>
        <input type="text" {...register("age", { valueAsNumber: true })} />
        <p style={{ color: "red" }}>{errors.age?.message}</p>
      </div>
      <div>
        <label>Website</label>
        <input
          type="text"
          defaultValue="http://example.com"
          {...register("website")}
        />
        <p style={{ color: "red" }}>{errors.website?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
