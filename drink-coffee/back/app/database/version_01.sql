create table `client`(
    id varchar(19) primary key not null,
    name varchar(100) not null,
    surname varchar(100) not null,
    email varchar(100) null,
    cpf varchar(100) null,
    password text not null,
    created_at varchar(50) not null,
    updated_at varchar(50) null,
    deleted_at varchar(50) null
);

create table `employee`(
    id varchar(19) primary key not null,
    name varchar(100) not null,
    surname varchar(100) not null,
    email varchar(100) not null,
    password text not null,
    created_at varchar(50) not null,
    updated_at varchar(50) null,
    deleted_at varchar(50) null
);

create table `product`(
    id varchar(19) primary key not null,
    category_id varchar(19) not null,
    name varchar(100) not null,
    price decimal(10,2) not null default 0,
    amount int(11) not null default 0,
    created_at varchar(50) not null,
    updated_at varchar(50) null,
    deleted_at varchar(50) null
);

create table `category`(
    id varchar(19) primary key not null,
    name varchar(100) not null,
    created_at varchar(50) not null,
    updated_at varchar(50) null,
    deleted_at varchar(50) null
);

create table `order`(
    id varchar(19) primary key not null,
    employee_id varchar(19) not null,
    client_id varchar(19) not null,
    total decimal(10,2) not null default 0,
    status varchar(50) not null,
    created_at varchar(50) not null,
    updated_at varchar(50) null,
    deleted_at varchar(50) null
);

create table `order_item`(
    id varchar(19) primary key not null,
    order_id varchar(19) not null,
    product_id varchar(19) not null,
    amount int(11) not null default 1,
    total_row decimal(10,2) not null default 0,
    total decimal(10,2) not null default 0,
    created_at varchar(50) not null,
    updated_at varchar(50) null,
    deleted_at varchar(50) null
);

create table `log`(
    id varchar(19) primary key not null,
    employee_id varchar(19) not null,
    title varchar(100) not null,
    content text not null,
    created_at varchar(50) not null,
    updated_at varchar(50) null,
    deleted_at varchar(50) null
);