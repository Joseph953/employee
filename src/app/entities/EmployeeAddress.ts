import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, OneToOne} from "typeorm";
import { Employee } from "./Employee";


@Entity("employeeAddress")
    export class EmployeeAddress extends BaseEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public address: string;

        
       
        

        

    

}