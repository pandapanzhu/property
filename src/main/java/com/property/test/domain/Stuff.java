package com.property.test.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Stuff.
 */
@Entity
@Table(name = "stuff")
public class Stuff implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private String userId;

    @NotNull
    @Column(name = "stuffname", nullable = false)
    private String stuffname;

    @Column(name = "gender")
    private String gender;

    @NotNull
    @Pattern(regexp = "^[0-9]{11}$")
    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "idcard", nullable = false)
    private String idcard;

    @Column(name = "address")
    private String address;

    @Column(name = "remark")
    private String remark;

    @Column(name = "dlt")
    private Integer dlt;

    @Column(name = "create_user")
    private String create_user;

    @Column(name = "create_date")
    private Instant createDate;

    @Column(name = "update_user")
    private String update_user;

    @Column(name = "update_date")
    private Instant update_date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public Stuff userId(String userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStuffname() {
        return stuffname;
    }

    public Stuff stuffname(String stuffname) {
        this.stuffname = stuffname;
        return this;
    }

    public void setStuffname(String stuffname) {
        this.stuffname = stuffname;
    }

    public String getGender() {
        return gender;
    }

    public Stuff gender(String gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public Stuff phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public Stuff email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdcard() {
        return idcard;
    }

    public Stuff idcard(String idcard) {
        this.idcard = idcard;
        return this;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard;
    }

    public String getAddress() {
        return address;
    }

    public Stuff address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getRemark() {
        return remark;
    }

    public Stuff remark(String remark) {
        this.remark = remark;
        return this;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getDlt() {
        return dlt;
    }

    public Stuff dlt(Integer dlt) {
        this.dlt = dlt;
        return this;
    }

    public void setDlt(Integer dlt) {
        this.dlt = dlt;
    }

    public String getCreate_user() {
        return create_user;
    }

    public Stuff create_user(String create_user) {
        this.create_user = create_user;
        return this;
    }

    public void setCreate_user(String create_user) {
        this.create_user = create_user;
    }

    public Instant getCreateDate() {
        return createDate;
    }

    public Stuff createDate(Instant createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(Instant createDate) {
        this.createDate = createDate;
    }

    public String getUpdate_user() {
        return update_user;
    }

    public Stuff update_user(String update_user) {
        this.update_user = update_user;
        return this;
    }

    public void setUpdate_user(String update_user) {
        this.update_user = update_user;
    }

    public Instant getUpdate_date() {
        return update_date;
    }

    public Stuff update_date(Instant update_date) {
        this.update_date = update_date;
        return this;
    }

    public void setUpdate_date(Instant update_date) {
        this.update_date = update_date;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Stuff stuff = (Stuff) o;
        if (stuff.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stuff.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stuff{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", stuffname='" + getStuffname() + "'" +
            ", gender='" + getGender() + "'" +
            ", phone='" + getPhone() + "'" +
            ", email='" + getEmail() + "'" +
            ", idcard='" + getIdcard() + "'" +
            ", address='" + getAddress() + "'" +
            ", remark='" + getRemark() + "'" +
            ", dlt=" + getDlt() +
            ", create_user='" + getCreate_user() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", update_user='" + getUpdate_user() + "'" +
            ", update_date='" + getUpdate_date() + "'" +
            "}";
    }
}
