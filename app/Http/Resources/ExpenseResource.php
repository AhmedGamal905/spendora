<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return
            [
                'id' => $this->id,
                'user_id' => $this->user_id,
                'category_id' => $this->category_id,
                'category_name' => $this->whenLoaded('category', function () {
                    return $this->category->name;
                }),
                'amount' => $this->amount,
                'description' => $this->description,
                'created_at' => $this->created_at->format('j M Y, g:i a'),
                'updated_at' => $this->updated_at->format('j M Y, g:i a'),
            ];
    }
}
