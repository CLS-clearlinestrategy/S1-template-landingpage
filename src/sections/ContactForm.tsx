import { useReducer } from "react";
import { siteConfig } from "@/config/siteConfig";
import RevealBlock from "@/components/core/RevealBlock";
import SplitText from "@/components/core/SplitText";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface FormState {
  values: { name: string; email: string; message: string };
  errors: Partial<Record<"name" | "email" | "message", string>>;
  status: "idle" | "submitting" | "success" | "error";
}

type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState["values"]; value: string }
  | { type: "SET_ERRORS"; errors: FormState["errors"] }
  | { type: "SUBMIT" }
  | { type: "SUCCESS" }
  | { type: "ERROR" }
  | { type: "RESET" };

const initialState: FormState = {
  values: { name: "", email: "", message: "" },
  errors: {},
  status: "idle",
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors, status: "idle" };
    case "SUBMIT":
      return { ...state, status: "submitting", errors: {} };
    case "SUCCESS":
      return { ...initialState, status: "success" };
    case "ERROR":
      return { ...state, status: "error" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const ContactForm = () => {
  const { contact } = siteConfig;
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fieldErrors: FormState["errors"] = {};
    const { name, email, message } = state.values;

    if (!name.trim()) fieldErrors.name = "Nome é obrigatório";
    if (!email.trim()) {
      fieldErrors.email = "E-mail é obrigatório";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      fieldErrors.email = "E-mail inválido";
    }
    if (!message.trim()) fieldErrors.message = "Mensagem é obrigatória";

    if (Object.keys(fieldErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: fieldErrors });
      return;
    }

    dispatch({ type: "SUBMIT" });

    // Simulate async submission
    await new Promise((resolve) => setTimeout(resolve, 1200));

    dispatch({ type: "SUCCESS" });
    toast.success(contact.successMessage);
  };

  const fieldKeys = ["name", "email", "message"] as const;

  return (
    <section id="contact" className="py-20 md:py-28">
      <RevealBlock className="container mx-auto px-6 max-w-xl">
        <div className="text-center mb-12">
          <SplitText
            text={contact.title}
            tag="h2"
            splitType="words"
            delay={40}
            duration={1}
            ease="power3.out"
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-3"
            textAlign="center"
          />
          <p className="text-muted-foreground">{contact.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 space-y-6">
          {fieldKeys.map((key) => {
            const field = contact.fields[key];
            const isTextarea = key === "message";
            const Component = isTextarea ? "textarea" : "input";

            return (
              <div key={key} className="space-y-2">
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-foreground"
                >
                  {field.label}
                </label>
                <Component
                  id={key}
                  name={key}
                  placeholder={field.placeholder}
                  value={state.values[key]}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: key,
                      value: (e.target as HTMLInputElement | HTMLTextAreaElement).value,
                    })
                  }
                  className={`w-full rounded-lg bg-background/50 border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                    state.errors[key] ? "border-destructive" : "border-border"
                  } ${isTextarea ? "min-h-[120px] resize-none" : ""}`}
                />
                {state.errors[key] && (
                  <p className="text-xs text-destructive">{state.errors[key]}</p>
                )}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={state.status === "submitting"}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all hover:shadow-[0_0_30px_hsla(145,65%,52%,0.25)]"
          >
            {state.status === "submitting" ? (
              <span className="inline-block w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                {contact.submitLabel}
              </>
            )}
          </button>
        </form>
      </RevealBlock>
    </section>
  );
};

export default ContactForm;
