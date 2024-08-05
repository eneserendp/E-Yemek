"use client"
import React from 'react'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import useAuthStore from '@/hooks/useAuth'
import registerUser from '@/actions/register'
import { startSession } from '@/lib/session'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { error } from 'console'
import { Loader2Icon } from 'lucide-react'


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

const CreateUserPage = () => {

  const {loader, setLoader} = useAuthStore();
  const { toast } = useToast()
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username:"",
      password:""
    },
  })

  const onSubmit=(data:z.infer<typeof formSchema>)=>{
    setLoader(true);

    registerUser(data.username, data.email, data.password).then(
      (resp)=>{
        startSession(resp.user, resp.jwt);
        toast({
          variant:"succes",
          title: "Account Created",
        })
        setLoader(false);
        router.push("/")
      },
      (error)=>{
        setLoader(false);
        toast({
          variant:"destructive",
          title: "Something went wrong",
        })

      }
    ).finally(()=>{
      setLoader(false)
    })

  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-4/5">
    <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='textone'>Username</FormLabel>
            <FormControl>
              <Input placeholder="Username" {...field} />
            </FormControl>
            <FormMessage className='validationLogin' />
          </FormItem>
        )}
      />
     
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='textone'>Email</FormLabel>
            <FormControl>
              <Input placeholder="email[]gmail.com" {...field} />
            </FormControl>
            <FormMessage className='validationLogin' />
          </FormItem>
        )}
      />

    <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='textone'>Password</FormLabel>
            <FormControl>
              <Input placeholder="Password" type="password" {...field} />
            </FormControl>
            <FormMessage className='validationLogin' />
          </FormItem>
        )}
      />

      <Button className='w-full' type="submit">

        {loader? <Loader2Icon className='animate-spin'/> :"Create Account"}
      </Button>
    </form>

    <div className='mt-8 '>
      <Label className='flex flex-col items-center'>
        Allready Account
   
        <Link href="/login" 
        className='text-mycolor3 font-semibold mt-5'>
        Click here to login page
        </Link>

      </Label>


    </div>
  </Form>
  )
}

export default CreateUserPage