import { placeholder } from "../../../../constants";
import { StudentController } from "../../../../controllers";
import { Student } from "../../../../models/dto";
import { Payment } from "../../../../models/dto/Student";
import { Button, CreateElement, Form, Input, InputLabel, InputPhoto, PageLayout, TextArea } from "../../../components";
import student from '~/assets/icons/Student.svg';

class CreateStudent extends PageLayout<StudentController> {
    formContainer: Form;
    formAddStudent!: HTMLDivElement;
    addFormInputs!: HTMLDivElement;
    photoInput!: InputPhoto;
    imageSelect: File | undefined;
    firstNameInput!: Input;
    lastNameInput!: Input;
    dateInput!: Input;
    email!: Input;
    parentNameInput!: Input;
    placeInput!: Input;
    phone!: Input;
    addressInput!: TextArea;
    firstNameParentInput!: Input;
    lastNameParentInput!: Input;
    phoneParentInput!: Input;
    emailParentInput!: Input;
    addressParentInput!: TextArea;
    paymentsCash!: InputLabel;
    paymentsDebit!: InputLabel;
    submit!: Button;
    saveAsDraft!: Button;

    constructor(data?: Student) {
        super("add_student-container", new StudentController());
        this.container.setAttribute("name", "Add New Student");
        this.formContainer = new Form("add_student-form-container  d-flex flex-col items-start flex-1 gap-8");
        this.formContainer.onSubmit(() => {
            this.handleSubmitForm();
        });

        this.initData();
    }

    initData(): void {
        super.initData();
        this.controller?.fetchData(this.initContent.bind(this));
    }

    protected initContent(): void {
        /**
         * add new student
         * @form student details: 2 columns
         * column_1: image
         * column_2: 4 rows
         * row_1: firstName + lastName
         * row_2: date & place of birth + parentName
         * row_3: email + phone
         * row_4: address
         * @form parent details:
         * column_1: 3 rows
         * row_1: firstName + lastName
         * row_2: email + phone
         * row_3: address + payments
         */
        /**
         * form student details
         * title: Student Details
        */
        const titleStudentDetais = CreateElement("div", "add_title");
        titleStudentDetais.innerHTML = "<h3>Student Details</h3>";

        /**
         * col_1
         * row_1 image
         * item_1
         */
        const labelPhoto = new InputLabel("Photo *", "add_label");
        this.photoInput = new InputPhoto((file: File) => this.handleSelectImage(file));
        const addInputItem1 = CreateElement("div", "add_form-input-item", [
            labelPhoto.render(),
            this.photoInput.render(),
        ]);
        const addFormInputRow1 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [addInputItem1]);
        const addFormInputCol1 = CreateElement("div", "add_form-input-col d-flex flex-col items-start gap-4", [
            addFormInputRow1,
        ]);

        /**
         * col_2
         * row2_1 firstName + lastName
         * item_2
         */
        const labelFirstName = new InputLabel("First Name *", "add_label");
        this.firstNameInput = new Input({
            placeholder: "First Name",
            required: true,
        },"add_input");
        const addInputItem2 = CreateElement("div", "add_form-input-item", [
            labelFirstName.render(),
            this.firstNameInput.render(),
        ]);

        /**
         * item_3
         */ 
        const labelLastName = new InputLabel("Last Name *", "add_label");
        this.lastNameInput = new Input({
            placeholder: "Last Name",
            required: true,
        }, "add_input");
        const addInputItem3 = CreateElement("div", "add_form-input-item", [
            labelLastName.render(),
            this.lastNameInput.render(),
        ]);
        const addFormInputRow2_1 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem2,
            addInputItem3,
        ]);

        /**
         * row2_2 date & place of birth + parentName
         * item_4
         */ 
        const labeldate = new InputLabel("Date & Place of Birth *", "add_label");
        this.dateInput = new Input({
            placeholder: "24 Februari 1997",
            required: true,
        },"add_input");
        this.placeInput = new Input({
            placeholder: "Viet Nam",
            required: true,
        },"add_input");
        const datePlaceRow = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            this.dateInput.render(),
            this.placeInput.render(),
        ]);
        const addInputItem4 = CreateElement("div", "add_form-input-item", [labeldate.render(), datePlaceRow]);

        /**
         * item_5
         */ 
        const labelParentName = new InputLabel("Parent Name *", "add_label");
        this.parentNameInput = new Input({
            placeholder: "Parent Name",
        }, "add_input");
        const addInputItem5 = CreateElement("div", "add_form-input-item", [
            labelParentName.render(),
            this.parentNameInput.render(),
        ]);
        const addFormInputRow2_2 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem4,
            addInputItem5,
        ]);

        /**
         * row2_3 email + phone
         * item_6
         */
        const labelEmail = new InputLabel("Email *", "add_label");
        this.email = new Input({
            placeholder: "Email",
            required: true,
        },"add_input");
        const addInputItem6 = CreateElement("div", "add_form-input-item", [
            labelEmail.render(),
            this.email.render(),
        ]);

        /**
         * item_7
         */
        const labelPhone = new InputLabel("Phone *", "add_label");
        this.phone = new Input({
            placeholder: "Phone",
            required: true,
        }, "add_input");
        const addInputItem7 = CreateElement("div", "add_form-input-item", [
            labelPhone.render(),
            this.phone.render()
        ]);
        const addFormInputRow2_3 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem6,
            addInputItem7,
        ]);

        /**
         * row2_4
         * item_8 address
         */
        const labelAddress = new InputLabel("Address *", "add_label");
        this.addressInput = new TextArea({
            placeholder: "Address",
            rows: 8,
            cols: 40,
        }, "add_input");
        const addInputItem8 = CreateElement("div", "add_form-input-item", [
            labelAddress.render(),
            this.addressInput.render(),
        ]);
        const addFormInputRow2_4 = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem8,
        ]);

        const addFormInputCol2 = CreateElement("div", "add_form-input-col d-flex flex-col items-start gap-4", [
            addFormInputRow2_1,
            addFormInputRow2_2,
            addFormInputRow2_3,
            addFormInputRow2_4
        ]);

        const addFormInputs1 = CreateElement("div", "add_form-inputs d-flex items-start justify-start gap-8", [
            addFormInputCol1,
            addFormInputCol2,
        ]);

        /**
         * create form student details
         */
        const formStudentDetails = CreateElement("div", "add_form d-flex flex-col flex-1 items-start justify-start", [
            titleStudentDetais,
            addFormInputs1,
        ]);

        /**
         * Parent detail
         * title: Parent Details
         */
        const titleParentDetails = CreateElement("div", "add_title");
        titleParentDetails.innerHTML = "<h3>Parent Details</h3>";

        /**
         * col_1
         * row_1 firstName + lastname
         * item_1 firstName 
         */
        const labelfirstNameParent = new InputLabel("First Name *", "add_label");
        this.firstNameParentInput = new Input({
            placeholder: "Mana",
            required: true,
        }, "add_input");
        const addInputItem1Parent = CreateElement("div", "add_form-input-item", [
            labelfirstNameParent.render(),
            this.firstNameParentInput.render(),
        ]);
        /**
         * item_2 lastname
         */
        const labelLastNameParent = new InputLabel("Last Name *", "add_label");
        this.lastNameParentInput = new Input({
            placeholder: "Purnama",
            required: true,
        }, "add_input");
        const addInputItem2Parent = CreateElement("div", "add_form-input-item", [
            labelLastNameParent.render(),
            this.lastNameParentInput.render(),
        ]);
        const addFormInputRow1Parent = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem1Parent,
            addInputItem2Parent,
        ]);
        /**
         * row_2 email + phone
         * item_3 email
         */
        const labelEmailParent = new InputLabel("Email *", "add_label");
        this.emailParentInput = new Input({
            placeholder: "Email",
            required: true
        }, "add_input");
        const addInputItem3Parent = CreateElement("div", "add_form-input-item", [
            labelEmailParent.render(),
            this.emailParentInput.render(),
        ]);
        /**
         * item_4 phone
         */
        const labelPhoneParent = new InputLabel("Phone *", "add_label");
        this.phoneParentInput = new Input({
            placeholder: "0000000000",
            required: true,
        }, "add_input");
        const addInputItem4Parent = CreateElement("div", "add_form-input-item", [
            labelPhoneParent.render(),
            this.phoneParentInput.render(),
        ]);
        const addFormInputRow2Parent = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem3Parent,
            addInputItem4Parent
        ]);
        /**
         * row_3 address + payment
         * item_5 address
         */
        const labelAddressParent = new InputLabel("Address *", "add_label");
        this.addressParentInput = new TextArea({
            placeholder: "Address",
            rows: 8,
            cols: 40,
        }, "add_input");
        const addInputItem5Parent = CreateElement("div", "add_form-input-item", [
            labelAddressParent.render(),
            this.addressParentInput.render(),
        ]);
        /**
         * item_6 payment
         */
        const labelPaymentParent = new InputLabel("Payment *", "add_label");
        // cash
        this.paymentsCash = new InputLabel("", 'add_form-radio cash d-flex items-center gap-2');
        this.paymentsCash.inputLabel.innerHTML = '<input type="radio" name="payment-option" value="cash" required> <span>Cash</span>';
        // debit
        this.paymentsDebit = new InputLabel('', 'add_form-radio debit d-flex items-center gap-2');
        this.paymentsDebit.inputLabel.innerHTML = '<input type="radio" name="payment-option" value="debit" required> <span>Debit</span>';
        const paymentsInputs = CreateElement('div', 'form-inputs d-flex gap-4', [this.paymentsCash.render(), this.paymentsDebit.render()]);
        const addInputItem6Parent = CreateElement("div", "add_form-input-item", [
            labelPaymentParent.render(),
            paymentsInputs
        ]);
        const addFormInputRow3Parent = CreateElement("div", "add_form-input-row d-flex items-start gap-5", [
            addInputItem5Parent,
            addInputItem6Parent
        ]);

        const addFormInputCol1Parent = CreateElement("div", "add_form-input-col d-flex flex-col flex-1 items-start gap-4", [
            addFormInputRow1Parent,
            addFormInputRow2Parent,
            addFormInputRow3Parent
        ]);

        const addFormInputs2 = CreateElement("div", "add_form-inputs d-flex items-start justify-start gap-8", [
            addFormInputCol1Parent,
        ]);

        /**
         * create form parent details
         */
        const formParentDetails = CreateElement("div", "add_form d-flex flex-col flex-1 items-start justify-start", [
            titleParentDetails,
            addFormInputs2,
        ]);

        // actions
        // Save as Draft
        this.saveAsDraft = new Button(
            'Save as Draft',
            null,
            null,
            'outlined',
            'sm',
            'add_submit save-as-draft',
            'disabled',
            () => {},
        );
        // Submit
        this.submit = new Button(
            'Submit',
            null,
            null,
            "filled",
            "sm",
            'add_submit',
            'active',
            () => {},
        );
        const actions = CreateElement(
            'div',
            'add_form-actions d-flex items-center justify-end gap-4',
            [this.saveAsDraft.render(), this.submit.render(),]
        );

        this.formContainer.form.append(formStudentDetails, formParentDetails, actions);

        this.container.appendChild(this.formContainer.form);
    }

    handleSubmitForm() {
        console.log(this.imageSelect);
        
        const student: Student = {
            avatar: this.imageSelect || undefined,
            firstName: this.firstNameInput.render().value,
            lastName: this.lastNameInput.render().value,
            class: "VII A",
            dob: new Date(this.dateInput.render().value),
            pob: this.placeInput.render().value,
            email: this.email.render().value,
            phone: parseInt(this.phone.render().value),
            address: this.addressInput.render().value,
            parentFirstName: this.firstNameParentInput.render().value 
            ? this.firstNameParentInput.render().value 
            : this.parentNameInput.render().value.split('')[0],
            parentLastName: this.lastNameParentInput.render().value
            ? this.lastNameParentInput.render().value
            : this.parentNameInput.render().value.split('')[1],
            parentEmail: this.emailParentInput.render().value,
            parentPhone: parseInt(this.phoneParentInput.render().value),
            parentAddress: this.addressParentInput.render().value,
            payment: (this.container.querySelector('input[name="payment-option"]:checked') as HTMLInputElement)?.value === 'cash' 
            ? Payment.Cash : Payment.Debit
        };

        this.controller?.handleCreateStudent(student);
    }

    handleSelectImage(file: File) {
        console.log(file);
        
        if (file) {
            this.imageSelect = file;
        }
    }

    render() {
        return this.container;
    }
}

export default CreateStudent;
