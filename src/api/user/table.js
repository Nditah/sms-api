import { DATABASE, GENDER } from "../../constants";
import { toObjectId, hash, cleanObject } from "../../lib";
import { genCode } from "../../lib/helpers";

const userArray = [
    {
        type: "ADMIN",
        title: "Mr",
        surname: "Sam",
        other_name: "Nditah",
        gender: GENDER.FEMALE,
        country_iso2: "ng",
        email: "nditah@gmail.com",
        password: "peace4321",
        api_key: genCode(16).toLowerCase(),
        api_access: true,
        credit: 100,
        otp: "1234001",
        otp_count: 1,
        phone: "08134836164",
        phone_personal: "08134836164",
        created_by: "1",
    },
    {
        type: "CUSTOMER",
        title: "Mrs",
        surname: "Royal",
        other_name: "Ambassador",
        gender: GENDER.FEMALE,
        country_iso2: "ng",
        email: "admin@rafs.sch.ng",
        password: "royal",
        api_key: "acd99e2c5d2c34ab65269a11ae97da2ead",
        otp: "1234002",
        otp_count: 1,
        api_access: true,
        credit: 50,
        phone: "08033852550",
        phone_personal: "08033852550",
        created_by: "1",
    },
    {
        type: "CUSTOMER",
        title: "Mr",
        surname: "Onyishi",
        other_name: "Samuel",
        gender: GENDER.MALE,
        country_iso2: "ng",
        email: "peacegroup@gmail.com",
        password: "peace=@01#",
        api_key: genCode(16).toLowerCase(),
        api_access: true,
        otp: "1234003",
        otp_count: 1,
        credit: 5,
        phone: "08091691571",
        phone_personal: "08091691571",
        created_by: "1",
    }];

const userBaseId = DATABASE.BASE_ID.STAFF;

// eslint-disable-next-line complexity
const result = userArray.map((record, index) => {
    const obj = Object.assign({}, record);
    obj._id = toObjectId(userBaseId, 1 + index);
    obj.password = record.password ? hash(record.password) : hash("peace");
    obj.created_by = record.created_by ? toObjectId(userBaseId, record.created_by) : null;
    return cleanObject(obj);
});

export default result;
