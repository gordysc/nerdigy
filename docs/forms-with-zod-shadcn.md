# Forms with Zod, shadcn/ui, and Server Actions

## Overview

This project uses a powerful combination of technologies for building type-safe, validated forms with excellent UX:

- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **shadcn/ui**: Pre-built form components
- **Server Actions**: Server-side form handling

## Basic Form Structure

### 1. Define the Schema

Start by defining a Zod schema that describes your form's shape and validation rules:

```typescript
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  })
});
```

### 2. Create the Form Component

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Server Actions Integration

### 1. Create a Server Action

```typescript
// features/myfeature/actions.ts
"use server";

export async function submitForm(email: string, password: string) {
  try {
    // Validate data server-side
    // Perform database operations
    // Return success/error

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
```

### 2. Call Server Action from Form

```typescript
import { submitForm } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    const result = await submitForm(values.email, values.password);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/success");
      router.refresh(); // Refresh server components
    }
  }

  return (
    <Form {...form}>
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
```

## Advanced Patterns

### Complex Validation

```typescript
const formSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"] // Error will appear on confirmPassword field
  });
```

### Dynamic Fields

```typescript
<FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="tech">Technology</SelectItem>
          <SelectItem value="health">Health</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### File Uploads

```typescript
const formSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size <= 5000000, {
    message: "File size must be less than 5MB"
  })
});

// In the form
<FormField
  control={form.control}
  name="file"
  render={({ field: { onChange, value, ...field } }) => (
    <FormItem>
      <FormLabel>Upload File</FormLabel>
      <FormControl>
        <Input
          type="file"
          onChange={(e) => onChange(e.target.files?.[0])}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Form Components Reference

### Essential Components

- `Form`: Wrapper that provides form context
- `FormField`: Controller for individual fields
- `FormItem`: Container for a form field
- `FormLabel`: Label for the field
- `FormControl`: Wrapper for the input
- `FormMessage`: Displays validation errors
- `FormDescription`: Helper text for the field

### Input Types

- `Input`: Text, email, password, number, etc.
- `Textarea`: Multi-line text
- `Select`: Dropdown selection
- `Checkbox`: Boolean values
- `RadioGroup`: Single selection from options
- `Switch`: Toggle between on/off
- `DatePicker`: Date selection
- `Slider`: Numeric range selection

## Best Practices

### 1. **Always Validate on Both Sides**

```typescript
// Client-side (immediate feedback)
const formSchema = z.object({
  email: z.string().email()
});

// Server-side (security)
export async function submitForm(email: string) {
  // Re-validate on server
  const parsed = formSchema.safeParse({ email });
  if (!parsed.success) {
    return { error: "Invalid data" };
  }
  // Process valid data
}
```

### 2. **Handle Loading States**

```typescript
<Button type="submit" disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Submitting...
    </>
  ) : (
    "Submit"
  )}
</Button>
```

### 3. **Provide Clear Error Messages**

```typescript
const formSchema = z.object({
  age: z
    .number()
    .min(18, "You must be at least 18 years old")
    .max(100, "Please enter a valid age")
});
```

### 4. **Use Optimistic Updates**

```typescript
async function onSubmit(values: FormData) {
  // Optimistically update UI
  setItems([...items, newItem]);

  const result = await createItem(values);

  if (result.error) {
    // Revert on error
    setItems(items);
    setError(result.error);
  }
}
```

### 5. **Debounce Expensive Validations**

```typescript
const emailSchema = z
  .string()
  .email()
  .refine(
    async (email) => {
      // Check if email is unique
      const exists = await checkEmailExists(email);
      return !exists;
    },
    { message: "Email already in use" }
  );

// Use with debouncing
const debouncedValidation = useMemo(
  () => debounce(form.trigger, 500),
  [form.trigger]
);
```

## Common Patterns

### Login Form Example

See: `features/auth/components/login-form.tsx`

Key features:

- Email and password validation
- Server action integration
- Loading states
- Error handling
- Router navigation on success

### Multi-Step Form

```typescript
const steps = [
  { fields: ["name", "email"] },
  { fields: ["address", "city"] },
  { fields: ["payment"] }
];

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  async function onNext() {
    const fields = steps[currentStep].fields;
    const isValid = await form.trigger(fields);

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  }

  // Render fields for current step
}
```

### Conditional Fields

```typescript
<FormField
  control={form.control}
  name="hasDiscount"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <FormLabel>Apply discount code</FormLabel>
    </FormItem>
  )}
/>

{form.watch("hasDiscount") && (
  <FormField
    control={form.control}
    name="discountCode"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Discount Code</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)}
```

## Testing Forms

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("validates email field", async () => {
  render(<MyForm />);

  const emailInput = screen.getByLabelText("Email");
  const submitButton = screen.getByRole("button", { name: /submit/i });

  // Test invalid email
  await userEvent.type(emailInput, "invalid");
  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });
});
```

## Troubleshooting

### Common Issues

1. **Form not submitting**: Check console for validation errors
2. **Validation not working**: Ensure zodResolver is properly configured
3. **Server action not called**: Verify "use client" directive and async handling
4. **State not updating**: Use form.watch() for reactive values
5. **Types not matching**: Ensure z.infer<typeof schema> is used consistently

## Conclusion

The combination of Zod, shadcn/ui, and server actions provides a robust foundation for building forms that are:

- Type-safe
- Well-validated
- User-friendly
- Secure
- Easy to maintain

Follow these patterns and best practices to create consistent, reliable forms throughout your application.
