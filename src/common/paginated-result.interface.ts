export class PaginatedResult {
  data: any[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

// sebetulnya ini sama aja kaya menentukan tipe data yg di return dari service.
// cuman karena panjang, bisa di pecah dengan interface seperti ini
