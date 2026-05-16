import { z } from "zod";

export function validateWithZod<T>(
  schema: z.ZodType<T>,
  data: unknown
) {
  

  const result = schema.safeParse(data);
  
  if (result.success) {
    return {
      success : true ,
      data : result.data,
      errors: null
    };


  }
  
  // record allows us to create an object with dynamic keys
  const errors  : Record<string, string[]> = {};
  
 result.error.issues.forEach(issue => {
  const key = issue.path.join('.');
  

  if(!errors[key]) {
    // Initialize with the first error message
    errors[key] = [issue.message]
  } else {
    // Add additional error messages
    errors[key].push(issue.message);
  } 



 });

 return {
  success: false,
  errors
 };
}
