import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
import { EmployeeAddress } from "./EmployeeAddress";


export enum Role{
    admin = "admin",hr="hr",manager="manager",engineer="engineer"
}



@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
    
        @Column({ nullable: false })
        public name: string;

        @Column({ nullable: false })
        public username: string;

        @Column({ nullable: false })
        public age: number;
      
        @Column({ nullable: true })
        public password: string;

        @Column({ nullable: true })
        public role :Role;



        @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

        @Column({ nullable: false })
        public departmentId: string;
    
        @OneToOne(() => EmployeeAddress, { cascade: true })
        @JoinColumn()
        public address: EmployeeAddress;
    
           

        

    

}