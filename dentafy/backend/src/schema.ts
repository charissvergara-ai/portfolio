import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    name: String!
    role: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Service {
    id: String!
    category: String!
    title: String!
    icon: String!
    sortOrder: Int!
  }

  type Testimonial {
    id: String!
    quote: String!
    author: String!
    createdAt: String!
  }

  type Appointment {
    id: String!
    fullName: String!
    contactNumber: String!
    preferredDate: String!
    preferredTime: String!
    dentalConcern: String!
    status: String!
    createdAt: String!
    userId: String
  }

  type Inquiry {
    id: String!
    name: String!
    email: String!
    contactNumber: String!
    message: String!
    createdAt: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AppointmentInput {
    fullName: String!
    contactNumber: String!
    preferredDate: String!
    preferredTime: String!
    dentalConcern: String!
  }

  input InquiryInput {
    name: String!
    email: String!
    contactNumber: String!
    message: String!
  }

  type Query {
    me: User
    services: [Service!]!
    testimonials: [Testimonial!]!
    myAppointments: [Appointment!]!
    allAppointments: [Appointment!]!
    allInquiries: [Inquiry!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    createAppointment(input: AppointmentInput!): Appointment!
    createInquiry(input: InquiryInput!): Inquiry!
    updateAppointmentStatus(id: String!, status: String!): Appointment!
  }
`;
